"use client";

import { useEffect, useState } from "react";
import { getGitHubActivity } from "@/lib/github";

export default function Header() {
    const [displayText, setDisplayText] = useState("");
    const [activity, setActivity] = useState<string | null>(null);
    const fullText = "teaching computers\nto watch sports";

    useEffect(() => {
        // Fetch GitHub activity
        getGitHubActivity().then(setActivity);

        // Typewriter effect
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Speed of typing

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="mb-24 font-mono relative">
            {/* Top Row: Name/Title + GitHub Widget (Absolute Top Right) */}
            <div className="flex flex-col gap-6 relative">

                {/* GitHub Widget - Top Right Absolute */}
                <div className="absolute top-0 right-0 hidden sm:block">
                    <div className="text-xs text-muted-foreground/60 font-medium bg-muted/5 px-3 py-1.5 rounded border border-border/40 backdrop-blur-sm">
                        github · {activity || "loading..."}
                    </div>
                </div>

                {/* Name and Title Block */}
                <div className="flex flex-col gap-2 pt-2">
                    <h1 className="text-5xl font-bold text-foreground tracking-tight">
                        Trevor Ju
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 text-lg text-foreground/80">
                        <span className="font-medium">ML/AI Engineer</span>
                        <span className="hidden sm:inline text-muted-foreground/40">•</span>
                        <span className="text-muted-foreground">Computer Vision · LLMs · RAG</span>
                    </div>
                </div>

                {/* Quote/Status Block with Blinking Cursor */}
                <div className="pl-6 border-l-2 border-primary py-1 mt-2 min-h-[3.5rem] flex items-center">
                    <p className="text-xl text-primary leading-relaxed whitespace-pre-line">
                        {displayText}
                        <span className="animate-blink inline-block w-[10px] h-[1.2em] align-middle bg-primary ml-1 mb-1"></span>
                    </p>
                </div>

                {/* Mobile-only GitHub Widget (below content) */}
                <div className="sm:hidden text-xs text-muted-foreground font-medium mt-2">
                    github · {activity || "loading..."}
                </div>

            </div>
        </header>
    );
}
