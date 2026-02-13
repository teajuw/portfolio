"use client";

import { useEffect, useState } from "react";
import { getGitHubActivity } from "@/lib/github";

const QUIPS = [
    "teaching computers\nto watch pickleball",
    "judging your music taste\nwith linear algebra",
    "automating myself\nout of a job",
    "putting RAG in my portfolio\nto explain my portfolio",
    "grading cello technique\nI couldn't play",
];

export default function Header() {
    const [displayText, setDisplayText] = useState("");
    const [activity, setActivity] = useState<string | null>(null);
    const [quipIndex, setQuipIndex] = useState(0);
    const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

    useEffect(() => {
        getGitHubActivity().then(setActivity);
    }, []);

    useEffect(() => {
        const currentQuip = QUIPS[quipIndex];
        let timer: NodeJS.Timeout;

        if (phase === 'typing') {
            if (displayText !== currentQuip) {
                // Type next character (Slower: 100ms)
                timer = setTimeout(() => {
                    setDisplayText(currentQuip.slice(0, displayText.length + 1));
                }, 100);
            } else {
                // Finished typing, hold for Reading (Longer: 7s)
                timer = setTimeout(() => setPhase('deleting'), 7000);
            }
        }
        else if (phase === 'deleting') {
            if (displayText === "") {
                // Fully deleted, wait before next quip (1s)
                timer = setTimeout(() => {
                    setQuipIndex((prev) => (prev + 1) % QUIPS.length);
                    setPhase('typing');
                }, 1000);
            }
            else {
                // Word-by-word deletion
                // Find the last boundary (space or newline)
                const lastSpace = displayText.lastIndexOf(' ');
                const lastNewline = displayText.lastIndexOf('\n');
                const cutIndex = Math.max(lastSpace, lastNewline);

                if (cutIndex === -1) {
                    // No more spaces/newlines, clear remainder
                    timer = setTimeout(() => setDisplayText(""), 500); // Slower delete pace
                } else {
                    // Slice up to the boundary
                    timer = setTimeout(() => setDisplayText(displayText.slice(0, cutIndex)), 300);
                }
            }
        }

        return () => clearTimeout(timer);
    }, [displayText, phase, quipIndex]);

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
                {/* Fixed height (h-20 approx 5rem) + items-start ensures text starts at top */}
                <div className="pl-6 border-l-2 border-primary py-1 mt-2 h-[5rem] flex items-start">
                    <p className="text-xl text-primary leading-relaxed whitespace-pre-line pt-0.5">
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
