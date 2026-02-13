"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  progress?: number;
}

export default function ProjectCard({ title, description, tags, progress = 100 }: ProjectCardProps) {
  // Reveal effect: Overlay covers (100 - progress)% from the top
  const revealPercentage = 100 - progress;
  const isComplete = progress === 100;

  return (
    <article
      className={`bg-card p-6 rounded-[8px] border border-transparent transition-all duration-200 cursor-pointer relative overflow-hidden group`}
      style={{
        boxShadow: '0 4px 12px rgba(26, 24, 50, 0.08)',
        transform: isComplete ? undefined : 'none' // Reset transform base
      }}
    >
      {/* Visual Overlay for Progress Reveal */}
      {!isComplete && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-700 ease-out"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(255, 253, 247, 0.95) 0%, 
              rgba(255, 253, 247, 0.7) ${revealPercentage}%, 
              transparent ${revealPercentage + 15}%)`
          }}
        />
      )}

      {/* Hover Lift Effect - dynamic based on progress */}
      <style jsx>{`
        article:hover {
          transform: translateY(-${isComplete ? 2 : 0.5}px);
        }
      `}</style>

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

      {/* Progress Indicator */}
      {!isComplete && (
        <div className="absolute bottom-4 right-4 text-muted-foreground/60 text-xs font-mono font-medium z-20">
          {progress}%
        </div>
      )}
    </article>
  );
}
