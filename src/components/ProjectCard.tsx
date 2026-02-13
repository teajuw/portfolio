import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectStatus = 'done' | 'demo' | 'wip' | 'paused';

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  status?: ProjectStatus;
}

export default function ProjectCard({ title, slug, description, tags, status = 'done' }: ProjectCardProps) {
  const isWip = status === 'wip';

  // Visual Styling logic
  // Only WIP gets the dashed border as requested.
  // We removed the heavy opacity dimming for non-done states to let content shine.

  let borderClass = "border-transparent";
  if (isWip) borderClass = "border-2 border-dashed border-primary/40";

  return (
    <Link href={`/projects/${slug}`}>
      <article
        className={`
          bg-card p-6 rounded-[8px]
          ${borderClass}
          group hover:-translate-y-1 hover:shadow-lg
          transition-all duration-300 cursor-pointer relative
          flex flex-col h-full
        `}
        style={{
          boxShadow: '0 4px 12px rgba(26, 24, 50, 0.08)',
        }}
      >
        {/* Top Anchor Icon */}
        <div className="absolute top-6 right-6 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300">
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>

        <div className="flex flex-col h-full relative z-0">
          <h3 className="text-xl font-bold mb-3 font-mono pr-8">{title}</h3>
          <p className="text-muted-foreground mb-6 text-[0.95rem] leading-relaxed line-clamp-2 flex-grow">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium font-mono border border-transparent group-hover:border-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
