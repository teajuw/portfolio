"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, ChevronLeft, Github, MessageSquare } from "lucide-react";

// Placeholder components for the demos
const PickleballDemo = () => (
    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center overflow-hidden">
        {/* Court Floor */}
        <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
        </div>

        {/* Moving Bounding Box (Player) */}
        <div className="w-32 h-64 border-2 border-green-400 absolute animate-[pulse_2s_infinite] shadow-[0_0_20px_rgba(74,222,128,0.5)] top-1/2 left-1/3 -translate-y-1/2 flex flex-col justify-between p-2">
            <div className="text-[10px] text-green-400 font-mono bg-black/50 w-fit px-1">PLAYER_ID: 1</div>
            <div className="text-[10px] text-green-400 font-mono bg-black/50 w-fit px-1">CONF: 0.98</div>
        </div>

        {/* Moving Ball */}
        <div className="w-4 h-4 bg-yellow-400 rounded-full absolute top-1/2 shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-[bounce_1s_infinite_alternate]" style={{ left: '45%' }}></div>
    </div>
);

const SpotifyDemo = () => (
    <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        {/* Abstract Waves */}
        <div className="flex gap-1 items-end h-64 opacity-60">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="w-8 bg-emerald-500 rounded-t-sm animate-[pulse_1s_ease-in-out_infinite]"
                    style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.5 + Math.random()}s`
                    }}
                ></div>
            ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
    </div>
);

const PortfolioDemo = () => (
    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center font-mono">
        <div className="text-3xl md:text-5xl text-orange-500 font-bold opacity-90">
            &gt; self_optimizing<span className="animate-blink">_</span>
        </div>
        <div className="absolute top-1/4 left-10 text-xs text-blue-500/40">
            import portfolio<br />
            portfolio.init(mode="dark")<br />
            &gt;&gt; SYSTEM READY
        </div>
    </div>
);

const PROJECTS = [
    {
        id: "pickleball",
        title: "PICKLEBALL CV",
        subtitle: "Computer Vision · Real-time Tracking",
        Demo: PickleballDemo,
        link: "/project/pickleball-cv",
        repo: "https://github.com/teajuw/pickleball-cv",
        theme: "text-green-400"
    },
    {
        id: "spotify",
        title: "SPOTIFY RAG",
        subtitle: "Semantic Search · Vector Embeddings",
        Demo: SpotifyDemo,
        link: "/project/spotify-rag",
        repo: "https://github.com/teajuw/spotify-rag",
        theme: "text-emerald-400"
    },
    {
        id: "portfolio",
        title: "META PORTFOLIO",
        subtitle: "Next.js · Generative UI",
        Demo: PortfolioDemo,
        link: "/project/portfolio",
        repo: "https://github.com/teajuw/portfolio",
        theme: "text-orange-400"
    }
];

export default function HeroVideoCarousel() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((p) => (p + 1) % PROJECTS.length);
    const prev = () => setCurrent((p) => (p - 1 + PROJECTS.length) % PROJECTS.length);

    return (
        <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans group">
            {/* Slides */}
            <div className="absolute inset-0">
                {PROJECTS.map((p, idx) => (
                    <div
                        key={p.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <p.Demo />

                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows (Vertical Center) */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/10 bg-black/20 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/10 bg-black/20 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* UI Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 pointer-events-none">

                {/* Top Nav */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="text-sm font-mono tracking-widest opacity-70">
                        TREVOR JU // DEV
                    </div>

                    {/* Quippy Bot Button */}
                    <button className="flex items-center gap-3 px-4 py-2 bg-transparent text-white/80 font-mono text-sm tracking-wide border border-white/20 rounded hover:bg-white/10 transition-colors">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        interview my bot <span className="text-white/50">(it doesn&apos;t get nervous)</span>
                    </button>
                </div>

                {/* Bottom Content */}
                <div className="flex flex-col items-start gap-8 max-w-4xl pointer-events-auto">

                    <div className="space-y-4">
                        <div className={`text-sm font-mono font-bold tracking-widest ${PROJECTS[current].theme}`}>
                            PROJECT {current + 1} / {PROJECTS.length}
                        </div>
                        {/* Title - Now Mono as requested */}
                        <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter leading-[0.9]">
                            {PROJECTS[current].title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-lg font-light font-sans">
                            {PROJECTS[current].subtitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Primary: Explore */}
                        <Link
                            href={PROJECTS[current].link}
                            className="px-8 py-3 bg-white text-black font-bold tracking-tight rounded hover:bg-gray-200 transition-colors"
                        >
                            EXPLORE PROJECT
                        </Link>

                        {/* Secondary: About Me (Distinct Style) */}
                        <Link
                            href="/about"
                            className="px-8 py-3 bg-transparent border-2 border-white/30 text-white font-bold tracking-tight rounded hover:bg-white/10 hover:border-white transition-all"
                        >
                            ABOUT ME
                        </Link>

                        {/* Tertiary: View Code */}
                        <Link
                            href={PROJECTS[current].repo}
                            target="_blank"
                            className="p-3 text-white/60 hover:text-white transition-colors"
                            title="View Code on GitHub"
                        >
                            <Github className="w-6 h-6" />
                        </Link>
                    </div>
                </div>

            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-30">
                <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${((current + 1) / PROJECTS.length) * 100}%` }}></div>
            </div>

        </div>
    );
}
