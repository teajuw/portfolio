import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content/projects');

export interface ProjectContent {
  slug: string;
  title: string;
  content: string;
  sections: { heading: string; content: string }[];
}

export function getProjectSlugs(): string[] {
  const files = fs.readdirSync(CONTENT_DIR);
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

export function getProjectContent(slug: string): ProjectContent | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract title from first # header
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  // Parse sections
  const sections: { heading: string; content: string }[] = [];
  const lines = content.split('\n');

  let currentHeading = 'Overview';
  let currentContent: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);

    if (h2Match) {
      if (currentContent.length > 0) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join('\n').trim(),
        });
      }
      currentHeading = h2Match[1];
      currentContent = [];
    } else if (!line.match(/^#\s+/)) {
      // Skip the main title line
      currentContent.push(line);
    }
  }

  // Add last section
  if (currentContent.length > 0) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join('\n').trim(),
    });
  }

  return {
    slug,
    title,
    content,
    sections,
  };
}

export function getAllProjects(): ProjectContent[] {
  const slugs = getProjectSlugs();
  return slugs
    .map(slug => getProjectContent(slug))
    .filter((p): p is ProjectContent => p !== null);
}
