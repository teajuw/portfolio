"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileText, MessageCircle } from "lucide-react";

interface FAQResponse {
  answer: string;
  sources: { section: string; chunkId: string }[];
}

type FAQStatus = 'idle' | 'searching' | 'generating' | 'done' | 'error';

interface ProjectFAQProps {
  projectSlug: string;
  projectTitle: string;
  variant?: 'inline' | 'sidebar';
}

const suggestedQuestions = [
  "What technologies were used?",
  "What was the biggest challenge?",
  "How does this work?",
];

export default function ProjectFAQ({ projectSlug, projectTitle, variant = 'inline' }: ProjectFAQProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<FAQStatus>('idle');
  const [response, setResponse] = useState<FAQResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (questionText?: string) => {
    const q = questionText || query;
    if (!q.trim()) return;

    setQuery(q);
    setError(null);
    setResponse(null);

    try {
      setStatus('searching');
      await new Promise(r => setTimeout(r, 200));

      setStatus('generating');

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          projectSlug,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate answer');
      }

      const data = await res.json();
      setResponse(data);
      setStatus('done');
    } catch (err) {
      setError((err as Error).message);
      setStatus('error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isSidebar = variant === 'sidebar';

  return (
    <div className={isSidebar ? "" : "border-t border-border pt-10"}>
      <h2 className={`font-bold font-mono text-foreground mb-4 ${isSidebar ? 'text-lg' : 'text-2xl mb-6'}`}>
        {isSidebar ? "Ask about this project" : "Ask about this project"}
      </h2>

      {/* Suggested Questions */}
      {status === 'idle' && !response && (
        <div className={`flex flex-wrap gap-2 mb-4 ${isSidebar ? 'text-xs' : ''}`}>
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSubmit(q)}
              className={`px-2 py-1 bg-accent text-accent-foreground rounded-full font-mono hover:bg-accent/80 transition-colors ${isSidebar ? 'text-xs' : 'text-sm px-3 py-1.5'}`}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className={`flex gap-2 mb-4 ${isSidebar ? '' : 'gap-3 mb-6'}`}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className={`flex-1 bg-card border border-border rounded-lg px-3 py-2 font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 ${isSidebar ? 'text-sm' : 'px-4 py-3'}`}
          disabled={status === 'searching' || status === 'generating'}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={!query.trim() || status === 'searching' || status === 'generating'}
          className={`px-3 py-2 bg-primary text-primary-foreground rounded-lg font-mono font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isSidebar ? '' : 'px-4 py-3'}`}
        >
          <Send className={`${isSidebar ? 'w-4 h-4' : 'w-5 h-5'}`} />
        </button>
      </div>

      {/* Status */}
      {(status === 'searching' || status === 'generating') && (
        <div className={`flex items-center gap-2 font-mono text-muted-foreground mb-4 ${isSidebar ? 'text-xs' : 'text-sm mb-6'}`}>
          <Loader2 className="w-4 h-4 animate-spin" />
          {status === 'searching' && 'searching...'}
          {status === 'generating' && 'generating...'}
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className={`bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg font-mono ${isSidebar ? 'text-xs mb-4' : 'text-sm mb-6 px-4 py-3'}`}>
          {error || 'Something went wrong.'}
        </div>
      )}

      {/* Response */}
      {response && status === 'done' && (
        <div className={`bg-card border border-border rounded-lg p-4 ${isSidebar ? 'text-sm' : 'p-6'}`}>
          <p className={`text-foreground/90 leading-relaxed whitespace-pre-wrap mb-3 ${isSidebar ? 'text-sm' : 'mb-4'}`}>
            {response.answer}
          </p>

          {/* Sources */}
          {response.sources.length > 0 && (
            <div className={`border-t border-border pt-3 mt-3 ${isSidebar ? '' : 'pt-4 mt-4'}`}>
              <div className={`flex items-center gap-2 font-mono text-muted-foreground mb-2 ${isSidebar ? 'text-xs' : 'text-xs'}`}>
                <FileText className="w-3 h-3" />
                Sources
              </div>
              <div className="flex flex-wrap gap-1">
                {response.sources.map((source, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-muted/20 text-muted-foreground rounded text-xs font-mono"
                  >
                    {source.section}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Floating Action Button for mobile scroll-back
export function FAQScrollButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-105 md:hidden"
      aria-label="Ask about this project"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
