type ProjectStatus = 'done' | 'demo' | 'wip' | 'paused';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  status?: ProjectStatus;
}

export default function ProjectCard({ title, description, tags, status = 'done' }: ProjectCardProps) {
  const isDone = status === 'done';
  const isDemo = status === 'demo';
  const isWip = status === 'wip';
  const isPaused = status === 'paused';

  // Badge Config
  const badgeConfig = {
    done: null,
    demo: { text: "NEEDS DEMO", bg: "bg-muted" },
    wip: { text: "BUILDING", bg: "bg-primary" },
    paused: { text: "PAUSED", bg: "bg-muted" },
  };

  const currentBadge = badgeConfig[status];

  // Visual Styling logic
  const opacityClass = isDone ? "opacity-100" : "opacity-60";

  let borderClass = "border-transparent";
  if (isDemo) borderClass = "border-2 border-primary border-solid";
  if (isWip) borderClass = "border-2 border-primary border-dashed";
  if (isPaused) borderClass = "border-transparent";

  // Hover logic (only done cards float up meaningfully)
  // We'll apply pointer-events-none or just reduced hover for non-done if desired, 
  // but spec says "minimal or no hover effect". We can just conditionally apply the hover transform class.
  const hoverClass = isDone
    ? "group hover:-translate-y-0.5"
    : "";

  return (
    <article
      className={`
        bg-card p-6 rounded-[8px] 
        ${borderClass} 
        ${opacityClass} 
        ${hoverClass}
        transition-all duration-200 cursor-pointer relative
      `}
      style={{
        boxShadow: isDone ? '0 4px 12px rgba(26, 24, 50, 0.08)' : 'none',
      }}
    >
      {/* Badge */}
      {currentBadge && (
        <div className={`absolute top-3 right-3 ${currentBadge.bg} text-white px-2 py-1 rounded-[4px] text-[10px] uppercase font-mono font-medium tracking-wide`}>
          {currentBadge.text}
        </div>
      )}

      <div className="h-full flex flex-col relative z-0">
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
