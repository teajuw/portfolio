interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
}

export default function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <article
      className="bg-card p-6 rounded-[8px] border border-transparent hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      style={{ boxShadow: 'var(--color-border)' }}
    // Tailwind v4 shadow util might need config, using inline for exact match first
    // Actually, let's use the shadow we defined in globals or an arbitrary value
    >
      <div className="h-full flex flex-col">
        <h3 className="text-xl font-bold mb-3 font-mono">{title}</h3>
        <p className="text-muted-foreground mb-5 text-[0.95rem] line-clamp-2 flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
