interface TechGridProps {
    items: { category: string; skills: string[] }[];
}

export function TechGrid({ items }: TechGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {items.map((group) => (
                <div key={group.category} className="space-y-4">
                    <h3 className="text-sm font-mono text-white/50">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white/90 hover:bg-white/10 transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
