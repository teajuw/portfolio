"use client";

import { Search, X, Check, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface SearchResult {
    project: string;
    title: string;
    relevance: number;
    snippet: string;
    section: string;
    matchedTerms: string[];
}

type SearchStatus = 'idle' | 'embedding' | 'searching' | 'done' | 'error';

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<SearchStatus>('idle');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const handleClear = () => {
        setQuery("");
        setResults([]);
        setStatus('idle');
        setError(null);
        inputRef.current?.focus();
    };

    const performSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setStatus('idle');
            return;
        }

        try {
            setError(null);
            setStatus('embedding');

            // Small delay to show embedding status
            await new Promise(r => setTimeout(r, 300));
            setStatus('searching');

            const response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: searchQuery }),
            });

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setResults(data.results);
            setStatus('done');
        } catch (err) {
            setError((err as Error).message);
            setStatus('error');
        }
    }, []);

    // Debounced search
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (!query.trim()) {
            setResults([]);
            setStatus('idle');
            return;
        }

        debounceRef.current = setTimeout(() => {
            performSearch(query);
        }, 400);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, performSearch]);

    const showResults = results.length > 0 && status === 'done';

    return (
        <div className="col-span-full mb-12 relative">
            <div
                className={`
                    relative flex flex-col w-full
                    bg-card rounded-[8px]
                    shadow-[0_4px_12px_rgba(26,24,50,0.08)]
                    transition-all duration-200
                    ${isFocused ? 'ring-2 ring-primary/50 shadow-lg' : ''}
                    ${showResults ? 'rounded-b-none' : ''}
                `}
            >
                {/* Input Row */}
                <div className="flex items-center p-4 md:p-6">
                    <Search className="w-5 h-5 text-muted-foreground mr-4 shrink-0" />

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder="semantic search · try 'computer vision' or 'Python projects'"
                        className="w-full bg-transparent border-none outline-none font-mono text-foreground placeholder:text-muted-foreground/60 text-lg"
                    />

                    {query && (
                        <button
                            onClick={handleClear}
                            className="ml-4 p-1 hover:bg-muted/20 rounded-full transition-colors shrink-0"
                            aria-label="Clear search"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    )}
                </div>

                {/* Status Line */}
                {status !== 'idle' && query && (
                    <div className="px-4 md:px-6 pb-3 -mt-1">
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                            <StatusStep
                                label="embedding"
                                active={status === 'embedding'}
                                done={status === 'searching' || status === 'done'}
                            />
                            <span className="text-muted-foreground/40">→</span>
                            <StatusStep
                                label="searching"
                                active={status === 'searching'}
                                done={status === 'done'}
                            />
                            {status === 'done' && (
                                <>
                                    <span className="text-muted-foreground/40">→</span>
                                    <span className="text-primary flex items-center gap-1">
                                        found {results.length} {results.length === 1 ? 'match' : 'matches'}
                                        <Check className="w-3 h-3" />
                                    </span>
                                </>
                            )}
                            {status === 'error' && (
                                <>
                                    <span className="text-muted-foreground/40">→</span>
                                    <span className="text-red-500">error</span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Results Dropdown */}
            {showResults && (
                <div className="absolute top-full left-0 right-0 z-50 bg-card border-t border-border rounded-b-[8px] shadow-lg overflow-hidden">
                    {results.map((result, index) => (
                        <a
                            key={result.project}
                            href={`/projects/${result.project}`}
                            className={`
                                block p-4 hover:bg-accent/50 transition-colors
                                ${index < results.length - 1 ? 'border-b border-border/50' : ''}
                            `}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-mono font-bold text-foreground">
                                            {result.title}
                                        </h4>
                                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                                            {result.relevance}%
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                        {result.snippet}
                                    </p>
                                    {result.matchedTerms.length > 0 && (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
                                            <span>matched:</span>
                                            {result.matchedTerms.map((term, i) => (
                                                <span key={term} className="text-accent-foreground">
                                                    {term}{i < result.matchedTerms.length - 1 ? ',' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatusStep({ label, active, done }: { label: string; active: boolean; done: boolean }) {
    return (
        <span className={`flex items-center gap-1 ${active ? 'text-primary' : done ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>
            {active && <Loader2 className="w-3 h-3 animate-spin" />}
            {done && <Check className="w-3 h-3 text-green-500" />}
            {label}
        </span>
    );
}
