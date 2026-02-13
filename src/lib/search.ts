import { embedQuery, cosineSimilarity } from './embeddings';
import knowledgeBase from '@/data/knowledge.json';

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
}

export interface SearchResult {
  project: string;
  title: string;
  relevance: number;
  snippet: string;
  section: string;
  matchedTerms: string[];
}

// Extract likely matched terms from query and content
function extractMatchedTerms(query: string, content: string): string[] {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const contentLower = content.toLowerCase();

  const matched: string[] = [];

  // Check for direct word matches
  for (const word of queryWords) {
    if (contentLower.includes(word)) {
      matched.push(word);
    }
  }

  // Check for common tech terms
  const techTerms = [
    'python', 'pytorch', 'opencv', 'react', 'typescript', 'javascript',
    'fastapi', 'llm', 'rag', 'embedding', 'vector', 'api',
    'computer vision', 'machine learning', 'deep learning', 'neural network',
    'transformer', 'attention', 'cnn', 'vit', 'slam', 'optical flow',
    'full-stack', 'frontend', 'backend', 'database'
  ];

  for (const term of techTerms) {
    if (query.toLowerCase().includes(term) && contentLower.includes(term)) {
      if (!matched.includes(term)) {
        matched.push(term);
      }
    }
  }

  return matched.slice(0, 5); // Limit to 5 terms
}

// Create snippet from content, highlighting relevant parts
function createSnippet(content: string, maxLength: number = 150): string {
  // Clean up the content
  const cleaned = content
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return cleaned.substring(0, maxLength).trim() + '...';
}

export async function searchProjects(
  query: string,
  scope: 'all' | string = 'all',
  topK: number = 6
): Promise<SearchResult[]> {
  const kb = knowledgeBase as KnowledgeBase;

  // Embed the query
  const queryEmbedding = await embedQuery(query);

  // Filter chunks by scope if needed
  let chunks = kb.chunks;
  if (scope !== 'all') {
    chunks = chunks.filter(c => c.project === scope);
  }

  // Calculate similarities
  const scored = chunks.map(chunk => ({
    chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  // Sort by similarity
  scored.sort((a, b) => b.similarity - a.similarity);

  // Group by project, keeping best chunk per project
  const projectBest = new Map<string, typeof scored[0]>();

  for (const item of scored) {
    const existing = projectBest.get(item.chunk.project);
    if (!existing || item.similarity > existing.similarity) {
      projectBest.set(item.chunk.project, item);
    }
  }

  // Convert to results
  const results: SearchResult[] = [];

  for (const [projectSlug, item] of projectBest) {
    const projectMeta = kb.projects[projectSlug];

    results.push({
      project: projectSlug,
      title: projectMeta?.title || projectSlug,
      relevance: Math.round(item.similarity * 100),
      snippet: createSnippet(item.chunk.content),
      section: item.chunk.section,
      matchedTerms: extractMatchedTerms(query, item.chunk.content),
    });
  }

  // Sort by relevance and limit
  results.sort((a, b) => b.relevance - a.relevance);

  return results.slice(0, topK);
}
