"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function DarkLayout({
    children,
    showBackLink = true,
}: {
    children: React.ReactNode;
    showBackLink?: boolean;
}) {
    return (
        <div className="min-h-screen w-full bg-[#050505] text-white font-sans selection:bg-white/20">

            {/* Sticky Top Nav */}
            <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none mix-blend-difference">
                <div className="flex items-center gap-4 pointer-events-auto">
                    {showBackLink && (
                        <Link
                            href="/"
                            className="group p-2 -ml-2 text-white/50 hover:text-white transition-colors"
                            title="Back to Carousel"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                    )}
                    <Link href="/" className="text-sm font-mono tracking-widest opacity-70 hover:opacity-100 transition-opacity">
                        TREVOR JU // DEV
                    </Link>
                </div>

                <Link
                    href="/about"
                    className="pointer-events-auto flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md text-white/80 font-mono text-sm tracking-wide border border-white/20 rounded hover:bg-white/20 transition-colors"
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="hidden sm:inline">INTERVIEW MY BOT</span>
                    <span className="sm:hidden">BOT</span>
                </Link>
            </div>

            {children}

            {/* Footer */}
            <footer className="w-full py-12 px-6 md:px-12 border-t border-white/5 mt-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-white/40 text-sm font-mono">
                    <div>
                        &copy; {new Date().getFullYear()} Trevor Ju. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="https://github.com/teajuw" target="_blank" className="hover:text-white transition-colors">GITHUB</Link>
                        <Link href="https://linkedin.com/in/teajuw" target="_blank" className="hover:text-white transition-colors">LINKEDIN</Link>
                        <Link href="mailto:trevorju@gmail.com" className="hover:text-white transition-colors">EMAIL</Link>
                    </div>
                </div>
            </footer>

        </div>
    );
}
