import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjectContent, getProjectSlugs } from '@/lib/projects';
import ProjectFAQ from '@/components/ProjectFAQ';
import ProjectPageClient from './client';

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

  return <ProjectPageClient project={project} slug={slug} />;
}
