/**
 * Build-time script to generate knowledge.json with embeddings
 *
 * Usage: npx tsx scripts/build-knowledge.ts
 *
 * Requires OPENAI_API_KEY environment variable
 */

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const CONTENT_DIR = path.join(process.cwd(), 'content/projects');
const OUTPUT_PATH = path.join(process.cwd(), 'src/data/knowledge.json');
const CHUNK_SIZE = 500; // approximate tokens per chunk
const EMBEDDING_MODEL = 'text-embedding-3-small';

interface Chunk {
  id: string;
  project: string;
  section: string;
  content: string;
  embedding: number[];
}

interface ProjectMeta {
  title: string;
  slug: string;
  chunkIds: string[];
}

interface KnowledgeBase {
  chunks: Chunk[];
  projects: Record<string, ProjectMeta>;
  metadata: {
    generatedAt: string;
    embeddingModel: string;
    totalChunks: number;
  };
}

// Simple chunking by sections (## headers)
function chunkMarkdown(content: string, slug: string): { section: string; content: string }[] {
  const sections: { section: string; content: string }[] = [];
  const lines = content.split('\n');

  let currentSection = 'overview';
  let currentContent: string[] = [];

  for (const line of lines) {
    // Check for ## headers (section breaks)
    const headerMatch = line.match(/^##\s+(.+)$/);

    if (headerMatch) {
      // Save previous section if it has content
      if (currentContent.length > 0) {
        const text = currentContent.join('\n').trim();
        if (text.length > 50) { // Only keep substantial chunks
          sections.push({
            section: currentSection,
            content: text
          });
        }
      }

      currentSection = headerMatch[1].toLowerCase().replace(/\s+/g, '-');
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentContent.length > 0) {
    const text = currentContent.join('\n').trim();
    if (text.length > 50) {
      sections.push({
        section: currentSection,
        content: text
      });
    }
  }

  return sections;
}

// Extract title from markdown (first # header)
function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

async function generateEmbeddings(texts: string[], openai: OpenAI): Promise<number[][]> {
  console.log(`  Generating embeddings for ${texts.length} chunks...`);

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });

  return response.data.map(d => d.embedding);
}

async function main() {
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const openai = new OpenAI();

  console.log('Building knowledge base...\n');

  // Read all markdown files
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} project files\n`);

  const allChunks: Omit<Chunk, 'embedding'>[] = [];
  const projects: Record<string, ProjectMeta> = {};

  // Process each file
  for (const file of files) {
    const slug = file.replace('.md', '');
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const title = extractTitle(content);
    const sections = chunkMarkdown(content, slug);

    console.log(`Processing: ${title} (${sections.length} sections)`);

    const chunkIds: string[] = [];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const chunkId = `${slug}-${i}`;

      allChunks.push({
        id: chunkId,
        project: slug,
        section: section.section,
        content: section.content,
      });

      chunkIds.push(chunkId);
    }

    projects[slug] = {
      title,
      slug,
      chunkIds,
    };
  }

  console.log(`\nTotal chunks: ${allChunks.length}`);

  // Generate embeddings in batches
  const BATCH_SIZE = 20;
  const embeddings: number[][] = [];

  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map(c => `${c.section}: ${c.content}`);
    const batchEmbeddings = await generateEmbeddings(texts, openai);
    embeddings.push(...batchEmbeddings);
  }

  // Combine chunks with embeddings
  const chunksWithEmbeddings: Chunk[] = allChunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
  }));

  // Build final knowledge base
  const knowledgeBase: KnowledgeBase = {
    chunks: chunksWithEmbeddings,
    projects,
    metadata: {
      generatedAt: new Date().toISOString(),
      embeddingModel: EMBEDDING_MODEL,
      totalChunks: chunksWithEmbeddings.length,
    },
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write output
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(knowledgeBase, null, 2));

  console.log(`\nKnowledge base written to: ${OUTPUT_PATH}`);
  console.log(`Total size: ${(fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1)} KB`);
}

main().catch(console.error);
