"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Github } from "lucide-react";

// --- GLITCH UTILS ---
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;':\",./<>?";

const GlitchTitle = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState(text);
    const iterations = useRef(0);
    const timer = useRef<NodeJS.Timeout | null>(null);

    // Trigger decode effect on mount/text change
    useEffect(() => {
        iterations.current = 0;
        if (timer.current) clearInterval(timer.current);

        timer.current = setInterval(() => {
            setDisplay(() =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iterations.current) return text[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );
            iterations.current += 1 / 2;
            if (iterations.current >= text.length && timer.current) clearInterval(timer.current);
        }, 40);

        return () => { if (timer.current) clearInterval(timer.current); };
    }, [text]);

    // Minimal Ambient Glitch (Random character flips)
    useEffect(() => {
        const ambientTimer = setInterval(() => {
            if (Math.random() > 0.95) { // 5% chance every 2s to glitch 1 char
                setDisplay(prev => {
                    const arr = prev.split("");
                    const randIdx = Math.floor(Math.random() * arr.length);
                    // Only glitch if it's already the correct char (don't break the decode)
                    if (arr[randIdx] === text[randIdx]) {
                        arr[randIdx] = CHARS[Math.floor(Math.random() * CHARS.length)];
                        setTimeout(() => {
                            setDisplay(current => {
                                const restore = current.split("");
                                restore[randIdx] = text[randIdx];
                                return restore.join("");
                            });
                        }, 100);
                    }
                    return arr.join("");
                });
            }
        }, 2000);
        return () => clearInterval(ambientTimer);
    }, [text]);

    return <span className="font-mono">{display}</span>;
}

// --- DEMO COMPONENTS ---
const PickleballDemo = () => (
    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
        </div>
        <div className="w-32 h-64 border-2 border-green-400 absolute animate-[pulse_2s_infinite] shadow-[0_0_20px_rgba(74,222,128,0.5)] top-1/2 left-1/3 -translate-y-1/2 flex flex-col justify-between p-2">
            <div className="text-[10px] text-green-400 font-mono bg-black/50 w-fit px-1">PLAYER_ID: 1</div>
            <div className="text-[10px] text-green-400 font-mono bg-black/50 w-fit px-1">CONF: 0.98</div>
        </div>
        <div className="w-4 h-4 bg-yellow-400 rounded-full absolute top-1/2 shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-[bounce_1s_infinite_alternate]" style={{ left: '45%' }}></div>
    </div>
);

const AimVipDemo = () => (
    <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
        {/* Skeleton Overlay */}
        <div className="relative w-64 h-80 opacity-80">
            <svg viewBox="0 0 100 200" className="w-full h-full stroke-blue-400 fill-none stroke-[2]">
                {/* Simple stick figure cello posture */}
                <circle cx="50" cy="30" r="15" className="animate-[pulse_3s_infinite]" />
                <path d="M50 45 L50 100 M20 60 L50 50 L80 60 M30 180 L50 100 L70 180" className="stroke-blue-500/50" />
                {/* Bow arm */}
                <path d="M80 60 L100 80 L70 90" className="stroke-blue-300 animate-[pulse_1s_infinite]" />
                {/* Cello body outline */}
            </svg>
            <div className="absolute top-0 right-0 text-[10px] font-mono text-blue-400 bg-black/80 px-1 border border-blue-400/30">
                NPU_ACCEL: ON<br />FPS: 60
            </div>
        </div>
    </div>
);

const SpotifyDemo = () => (
    <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
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

const HuggingFaceDemo = () => (
    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center overflow-hidden">
        {/* Network Graph */}
        <div className="relative w-full h-full">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)'
                    }}>
                </div>
            ))}
            <svg className="absolute inset-0 w-full h-full stroke-yellow-500/20 stroke-1">
                <line x1="30%" y1="30%" x2="70%" y2="70%" />
                <line x1="70%" y1="30%" x2="30%" y2="70%" />
                <line x1="50%" y1="20%" x2="50%" y2="80%" />
            </svg>
        </div>
        <div className="absolute bottom-20 left-10 font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
            STATUS: DEPLOYED<br />REPLICAS: 4
        </div>
    </div>
);

const CvCourseworkDemo = () => (
    <div className="absolute inset-0 bg-[#000] flex items-center justify-center">
        {/* 3D Point Cloud Effect */}
        <div className="grid grid-cols-8 gap-4 opacity-50 rotate-12 scale-110">
            {[...Array(32)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.05}s` }}></div>
            ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"></div>
    </div>
);

const PROJECTS = [
    {
        id: "pickleball",
        title: "PICKLEBALL CV",
        subtitle: "Computer Vision · Real-time Tracking",
        Demo: PickleballDemo,
        link: "/projects/pickleball-cv",
        repo: "https://github.com/teajuw/pickleball-cv",
        theme: "text-green-400"
    },
    {
        id: "aim-vip",
        title: "AIM RESEARCH",
        subtitle: "Android NPU · Pose Estimation",
        Demo: AimVipDemo,
        link: "/projects/aim-vip-research",
        repo: "https://github.com/teajuw/aim-vip",
        theme: "text-blue-400"
    },
    {
        id: "spotify",
        title: "SPOTIFY RAG",
        subtitle: "Semantic Search · Vector Embeddings",
        Demo: SpotifyDemo,
        link: "/projects/spotify-rag",
        repo: "https://github.com/teajuw/spotify-rag",
        theme: "text-emerald-400"
    },
    {
        id: "portfolio",
        title: "META PORTFOLIO",
        subtitle: "Next.js · Generative UI",
        Demo: PortfolioDemo,
        link: "/projects/portfolio",
        repo: "https://github.com/teajuw/portfolio",
        theme: "text-orange-400"
    },
    {
        id: "huggingface",
        title: "MODEL REGISTRY",
        subtitle: "Distributed System · AWS · Docker",
        Demo: HuggingFaceDemo,
        link: "/projects/huggingface-clone",
        repo: "https://github.com/teajuw/huggingface-clone",
        theme: "text-yellow-400"
    },
    {
        id: "cv-coursework",
        title: "3D VISION ALGORITHMS",
        subtitle: "SLAM · Optical Flow · C++",
        Demo: CvCourseworkDemo,
        link: "/projects/cv-coursework",
        repo: "https://github.com/teajuw/cv-coursework",
        theme: "text-purple-400"
    }
];

export default function HeroVideoCarousel() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false); // Hover pause
    const [hasInteracted, setHasInteracted] = useState(false); // Manual nav disable
    const [progress, setProgress] = useState(0);

    // Manual Navigation (Disables Auto-Scroll)
    const next = useCallback(() => {
        setCurrent((p) => (p + 1) % PROJECTS.length);
        setProgress(0);
    }, []);

    const manualNext = () => {
        setHasInteracted(true);
        next();
    };

    const manualPrev = () => {
        setHasInteracted(true);
        setCurrent((p) => (p - 1 + PROJECTS.length) % PROJECTS.length);
        setProgress(0);
    };

    // Auto-Cycle Logic
    useEffect(() => {
        if (hasInteracted) {
            setProgress(0);
            return;
        }

        if (isPaused) {
            // Don't reset progress, just pause it
            return;
        }

        const duration = 8000;
        const interval = 100; // Update progress every 100ms
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    next();
                    return 0; // Reset
                }
                return p + step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [hasInteracted, isPaused, next]);

    return (
        <div
            className="relative w-full h-screen bg-black text-white overflow-hidden font-sans group perspective-1000"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides */}
            <div className="absolute inset-0">
                {PROJECTS.map((p, idx) => (
                    <div
                        key={p.id}
                        className={`absolute inset-0 transition-opacity duration-300 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {/* Glitch Container Effect */}
                        <div className={`relative w-full h-full ${idx === current ? 'animate-[glitch_0.5s_cubic-bezier(.25,.46,.45,.94)_both_infinite]' : ''}`}
                            style={idx === current ? { animationIterationCount: 1 } : {}}>

                            <p.Demo />

                            {/* RGB Split Overlay Only on Transition */}
                            <div className="absolute inset-0 hidden pointer-events-none md:block mix-blend-screen opacity-0 animate-[flash_0.5s_ease-out_1]">
                                {/* Red Channel Shift */}
                                <div className="absolute inset-0 translate-x-[4px] bg-red-500/20 mix-blend-multiply blur-[1px]"></div>
                                {/* Blue Channel Shift */}
                                <div className="absolute inset-0 -translate-x-[4px] bg-blue-500/20 mix-blend-multiply blur-[1px]"></div>
                            </div>
                        </div>

                        {/* Ambient Glitch Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button onClick={(e) => { e.stopPropagation(); manualPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/10 bg-black/20 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); manualNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/10 bg-black/20 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* UI Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 pointer-events-none">

                {/* Top Nav */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="text-sm font-mono tracking-widest opacity-70">TREVOR JU // DEV</div>
                    <button className="flex items-center gap-3 px-4 py-2 bg-transparent text-white/80 font-mono text-sm tracking-wide border border-white/20 rounded hover:bg-white/10 transition-colors">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        INTERVIEW MY BOT <span className="text-white/40">(IT DOESN'T GET NERVOUS)</span>
                    </button>
                </div>

                {/* Bottom Content */}
                <div className="flex flex-col items-start gap-8 max-w-4xl pointer-events-auto">
                    <div className="space-y-4">
                        <div className={`text-sm font-mono font-bold tracking-widest ${PROJECTS[current].theme}`}>PROJECT {current + 1} / {PROJECTS.length}</div>
                        <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter leading-[0.9] h-[1.1em] relative group-hover:scale-[1.01] transition-transform duration-500">
                            <span className="relative z-10"><GlitchTitle text={PROJECTS[current].title} /></span>
                            {/* Text Glitch Shadow - RGB Split */}
                            <span className="absolute left-0 top-0 text-red-500/50 opacity-0 animate-[ping_0.2s_cubic-bezier(0,0,0.2,1)_2] mix-blend-screen translate-x-[3px] blur-[1px]">{PROJECTS[current].title}</span>
                            <span className="absolute left-0 top-0 text-cyan-500/50 opacity-0 animate-[ping_0.2s_cubic-bezier(0,0,0.2,1)_2_0.1s] mix-blend-screen -translate-x-[3px] blur-[1px]">{PROJECTS[current].title}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-lg font-light font-sans">{PROJECTS[current].subtitle}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <Link href={PROJECTS[current].link} className="px-8 py-3 bg-white text-black font-bold tracking-tight rounded hover:bg-gray-200 transition-colors">EXPLORE PROJECT</Link>
                        <Link href="/about" className="px-8 py-3 bg-transparent border-2 border-white/30 text-white font-bold tracking-tight rounded hover:bg-white/10 hover:border-white transition-all">ABOUT ME</Link>
                        <Link href={PROJECTS[current].repo} target="_blank" className="p-3 text-white/60 hover:text-white transition-colors" title="View Code on GitHub"><Github className="w-6 h-6" /></Link>
                    </div>
                </div>
            </div>

            {/* Progress Bar (Time Remaining) */}
            {!hasInteracted && (
                <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-30 overflow-hidden">
                    {/* Glitchy Bar */}
                    <div className={`h-full bg-white transition-all duration-100 ease-linear relative ${progress > 90 ? 'animate-pulse bg-red-500' : ''}`}
                        style={{ width: `${progress}%` }}>
                        {/* Scanline snippet */}
                        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black/50 to-transparent"></div>
                    </div>
                </div>
            )}

        </div>
    );
}
