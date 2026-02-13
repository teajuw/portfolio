"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProjectFAQ, { FAQScrollButton } from '@/components/ProjectFAQ';
import DemoSection from '@/components/DemoSection';

interface ProjectContent {
  slug: string;
  title: string;
  content: string;
  sections: { heading: string; content: string }[];
}

interface ProjectPageClientProps {
  project: ProjectContent;
  slug: string;
}

export default function ProjectPageClient({ project, slug }: ProjectPageClientProps) {
  const faqRef = useRef<HTMLDivElement>(null);
  const [showFAB, setShowFAB] = useState(false);

  // Show FAB when FAQ is out of view (mobile only)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFAB(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check for demo section in content
  const demoSection = project.sections.find(s => s.heading.toLowerCase() === 'demo');
  const otherSections = project.sections.filter(s => s.heading.toLowerCase() !== 'demo');

  return (
    <main className="min-h-screen max-w-[1200px] mx-auto px-5 py-16">
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

      {/* Demo Section (if exists) */}
      {demoSection ? (
        <DemoSection placeholder={true} caption="Demo coming soon" />
      ) : (
        <DemoSection placeholder={true} />
      )}

      {/* Main Layout: Content + Sticky Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Mobile FAQ (shows at top on mobile) */}
          <div ref={faqRef} className="lg:hidden mb-10">
            <ProjectFAQ projectSlug={slug} projectTitle={project.title} variant="inline" />
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {otherSections.map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-bold font-mono text-foreground mb-4 pb-2 border-b border-border">
                  {section.heading}
                </h2>
                <div className="text-foreground/80 leading-relaxed">
                  {renderContent(section.content)}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Sticky Sidebar (desktop only) */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-8">
            <ProjectFAQ projectSlug={slug} projectTitle={project.title} variant="sidebar" />
          </div>
        </aside>
      </div>

      {/* Mobile FAB */}
      {showFAB && <FAQScrollButton onClick={scrollToFAQ} />}
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

    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-lg font-bold font-mono text-foreground mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    if (line.startsWith('- ')) {
      currentList.push(line.replace('- ', ''));
      continue;
    }

    if (!line.trim()) {
      flushList();
      continue;
    }

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
