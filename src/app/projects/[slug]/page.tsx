import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjectContent, getProjectSlugs } from '@/lib/projects';
import ProjectFAQ from '@/components/ProjectFAQ';

// Generate static params for all projects
export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map(slug => ({ slug }));
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectContent(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Trevor Ju`,
    description: project.sections[0]?.content.slice(0, 160) || '',
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectContent(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen max-w-[900px] mx-auto px-5 py-16">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        back to projects
      </Link>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold font-mono mb-8 text-foreground">
        {project.title}
      </h1>

      {/* Content Sections */}
      <div className="prose prose-lg max-w-none mb-16">
        {project.sections.map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-2xl font-bold font-mono text-foreground mb-4 pb-2 border-b border-border">
              {section.heading}
            </h2>
            <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {renderContent(section.content)}
            </div>
          </section>
        ))}
      </div>

      {/* FAQ Section */}
      <ProjectFAQ projectSlug={slug} projectTitle={project.title} />
    </main>
  );
}

// Simple markdown-ish rendering
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={elements.length} className="list-disc list-inside space-y-1 my-4">
          {currentList.map((item, i) => (
            <li key={i} className="text-foreground/80">{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockContent.length > 0) {
      elements.push(
        <pre key={elements.length} className="bg-foreground/5 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm">
          <code>{codeBlockContent.join('\n')}</code>
        </pre>
      );
      codeBlockContent = [];
    }
  };

  for (const line of lines) {
    // Code block handling
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // H3 headers
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-lg font-bold font-mono text-foreground mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    // List items
    if (line.startsWith('- ')) {
      elements.length > 0 && !currentList.length && flushList();
      currentList.push(line.replace('- ', ''));
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      flushList();
      continue;
    }

    // Regular paragraphs
    flushList();
    elements.push(
      <p key={elements.length} className="my-3">
        {formatInlineCode(line)}
      </p>
    );
  }

  flushList();
  flushCodeBlock();

  return elements;
}

// Format inline code (backticks)
function formatInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-foreground/5 px-1.5 py-0.5 rounded text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
