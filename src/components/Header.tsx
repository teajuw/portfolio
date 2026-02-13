"use client";

export default function Header() {
    return (
        <header className="mb-16">
            <h1 className="text-4xl font-bold mb-2 font-mono">Trevor Ju</h1>
            <div className="pl-4">
                <div className="text-2xl text-primary" style={{ fontFamily: 'var(--font-retro)' }}>
                    teaching computers
                </div>
                <div className="text-2xl text-primary" style={{ fontFamily: 'var(--font-retro)' }}>
                    to watch sports
                    <span className="inline-block w-[3px] h-6 bg-primary ml-1 align-middle animate-blink" />
                </div>
            </div>
        </header>
    );
}
