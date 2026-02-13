import { getGitHubActivity } from "@/lib/github";

export default async function Header() {
    const lastActive = await getGitHubActivity();

    return (
        <header className="mb-16">
            <h1 className="text-4xl font-bold mb-1 font-mono">Trevor Ju</h1>
            <div className="text-sm text-muted-foreground font-mono mb-4">
                ML/AI Engineer · Dec 2024
            </div>
            <div className="pl-4 border-l-2 border-primary/30">
                <div className="text-lg text-primary font-mono">
                    teaching computers
                </div>
                <div className="text-lg text-primary font-mono">
                    to watch sports
                    <span className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle animate-blink" />
                </div>
                {lastActive && (
                    <div className="text-xs text-muted-foreground mt-2 font-mono">
                        active {lastActive}
                    </div>
                )}
            </div>
        </header>
    );
}
