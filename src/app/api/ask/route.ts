import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { embedQuery, cosineSimilarity } from '@/lib/embeddings';
import knowledgeBase from '@/data/knowledge.json';

export const runtime = 'edge';

interface Chunk {
  id: string;
  project: string;
  section: string;
  content: string;
  embedding: number[];
}

interface KnowledgeBase {
  chunks: Chunk[];
  projects: Record<string, { title: string; slug: string; chunkIds: string[] }>;
}

const SYSTEM_PROMPT = `You are a helpful assistant answering questions about a specific project.
You MUST only answer based on the provided context. If the context doesn't contain enough information to answer the question, say so honestly.
Keep your answers concise and focused. Use the same technical terminology as the project documentation.
Do not make up information that isn't in the context.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, projectSlug } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    if (!projectSlug || typeof projectSlug !== 'string') {
      return NextResponse.json({ error: 'Project slug is required' }, { status: 400 });
    }

    const kb = knowledgeBase as KnowledgeBase;

    // Filter chunks to only this project
    const projectChunks = kb.chunks.filter(c => c.project === projectSlug);

    if (projectChunks.length === 0) {
      return NextResponse.json({
        answer: "I don't have any information about this project yet.",
        sources: [],
      });
    }

    // Embed query and find relevant chunks
    const queryEmbedding = await embedQuery(query);

    const scored = projectChunks.map(chunk => ({
      chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));

    scored.sort((a, b) => b.similarity - a.similarity);

    // Take top 3 most relevant chunks
    const topChunks = scored.slice(0, 3);

    // Build context from chunks
    const context = topChunks
      .map(({ chunk }) => `[${chunk.section}]\n${chunk.content}`)
      .join('\n\n---\n\n');

    // Get project title
    const projectTitle = kb.projects[projectSlug]?.title || projectSlug;

    // Call Groq LLM
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || process.env.GROQ || process.env.groq,
    });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Project: ${projectTitle}\n\nContext from project documentation:\n\n${context}\n\n---\n\nQuestion: ${query}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    const answer = completion.choices[0]?.message?.content || 'Unable to generate answer.';

    // Extract unique source sections
    const sources = topChunks.map(({ chunk }) => ({
      section: chunk.section,
      chunkId: chunk.id,
    }));

    // Dedupe by section
    const uniqueSources = sources.filter(
      (s, i, arr) => arr.findIndex(x => x.section === s.section) === i
    );

    return NextResponse.json({
      answer,
      sources: uniqueSources,
    });
  } catch (error) {
    console.error('Ask error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer', message: (error as Error).message },
      { status: 500 }
    );
  }
}
