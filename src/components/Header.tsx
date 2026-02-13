"use client";

export default function Header() {
    return (
        <header className="mb-16">
            <h1 className="text-4xl font-bold mb-6 font-mono">Trevor Ju</h1>
            <div className="pl-12">
                <div className="text-xl font-mono font-bold text-primary tracking-tight">
                    teaching computers
                </div>
                <div className="text-xl font-mono font-bold text-primary tracking-tight">
                    to watch sports
                    <span className="inline-block w-[3px] h-6 bg-primary ml-1 align-middle animate-pulse" />
                </div>
            </div>
        </header>
    );
}
