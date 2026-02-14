interface ContentSectionProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function ContentSection({ title, children, className = "" }: ContentSectionProps) {
    return (
        <section className={`px-6 md:px-12 max-w-4xl mx-auto py-12 md:py-16 ${className}`}>
            {title && (
                <h2 className="text-sm font-mono tracking-widest text-white/40 mb-8 border-b border-white/10 pb-4">
                    {title.toUpperCase()}
                </h2>
            )}
            <div className="text-lg md:text-xl text-white/80 leading-relaxed font-sans space-y-6">
                {children}
            </div>
        </section>
    );
}
