import { Quote } from "lucide-react";

export default function Header() {
    return (
        <header className="mb-16">
            <h1 className="text-4xl font-bold mb-6 font-mono">Trevor Ju</h1>
            <div className="pl-8 flex items-start gap-3">
                <Quote
                    size={24}
                    className="text-primary mt-1 flex-shrink-0"
                    strokeWidth={2.5}
                />
                <div className="space-y-0.5">
                    <div className="text-lg font-mono text-primary">
                        teaching computers
                    </div>
                    <div className="text-lg font-mono text-primary">
                        to watch sports
                    </div>
                </div>
            </div>
        </header>
    );
}
