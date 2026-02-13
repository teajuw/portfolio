import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // TODO: Gemini - implement hover tilt effect and styling per PLAN.md specs
  return (
    <div
      className="p-6 rounded-lg cursor-pointer transition-all"
      style={{
        background: 'var(--card)',
        boxShadow: '0 4px 12px rgba(26, 24, 50, 0.08)',
        borderRadius: '8px',
      }}
    >
      <h3 className="font-mono font-bold mb-2">{project.title}</h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: 'var(--tag-bg)',
              color: 'var(--tag-text)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
