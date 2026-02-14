import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface ProjectHeaderProps {
    title: string;
    subtitle: string;
    tags: string[];
    repoUrl?: string;
    demoUrl?: string;
}

export function ProjectHeader({ title, subtitle, tags, repoUrl, demoUrl }: ProjectHeaderProps) {
    return (
        <header className="pt-32 pb-12 md:pt-48 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col gap-8">

                {/* Tags */}
                <div className="flex flex-wrap gap-2 animate-[fadeIn_0.6s_ease-out]">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-white/60 bg-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <div className="space-y-4 animate-[slideUp_0.8s_ease-out]">
                    <h1 className="text-5xl md:text-8xl font-mono font-bold tracking-tighter leading-[0.9] text-white">
                        {title}
                    </h1>
                    <p className="text-xl md:text-3xl text-white/60 font-light max-w-2xl font-sans">
                        {subtitle}
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 animate-[fadeIn_1s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                    {repoUrl && (
                        <Link
                            href={repoUrl}
                            target="_blank"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold tracking-tight rounded hover:scale-105 transition-transform"
                        >
                            <Github className="w-5 h-5" />
                            VIEW CODE
                        </Link>
                    )}
                    {demoUrl && (
                        <Link
                            href={demoUrl}
                            target="_blank"
                            className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 text-white font-bold tracking-tight rounded hover:bg-white/10 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                            LIVE DEMO
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
