"use client";

import { useState, useRef } from "react";
import { Send, Loader2, FileText, MessageCircle } from "lucide-react";

interface FAQResponse {
  answer: string;
  sources: { section: string; chunkId: string }[];
}

type FAQStatus = 'idle' | 'searching' | 'generating' | 'done' | 'error';

interface ProjectFAQProps {
  projectSlug: string;
  projectTitle: string;
  variant?: 'inline' | 'sidebar' | 'compact';
}

const suggestedQuestions = [
  "How does this work?",
  "What tech was used?",
  "What was challenging?",
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

  const isCompact = variant === 'compact';

  if (isCompact) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="font-mono font-medium text-foreground">Ask about this project</span>
        </div>

        {/* Compact input row */}
        <div className="flex gap-2 mb-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={status === 'searching' || status === 'generating'}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!query.trim() || status === 'searching' || status === 'generating'}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Quick suggestions */}
        {status === 'idle' && !response && (
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSubmit(q)}
                className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full font-mono hover:bg-accent/80 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Status */}
        {(status === 'searching' || status === 'generating') && (
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Loader2 className="w-3 h-3 animate-spin" />
            {status === 'searching' ? 'searching...' : 'generating...'}
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="text-xs text-red-500 font-mono">
            {error || 'Something went wrong.'}
          </div>
        )}

        {/* Response */}
        {response && status === 'done' && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-sm text-foreground/90 leading-relaxed mb-2">
              {response.answer}
            </p>
            {response.sources.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="w-3 h-3" />
                {response.sources.map(s => s.section).join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Original inline variant
  return (
    <div className="border-t border-border pt-10">
      <h2 className="text-2xl font-bold font-mono text-foreground mb-6">
        Ask about this project
      </h2>

      {/* Suggested Questions */}
      {status === 'idle' && !response && (
        <div className="flex flex-wrap gap-2 mb-6">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSubmit(q)}
              className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-mono hover:bg-accent/80 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 mb-6">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask anything about ${projectTitle}...`}
          className="flex-1 bg-card border border-border rounded-lg px-4 py-3 font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled={status === 'searching' || status === 'generating'}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={!query.trim() || status === 'searching' || status === 'generating'}
          className="px-4 py-3 bg-primary text-primary-foreground rounded-lg font-mono font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Status */}
      {(status === 'searching' || status === 'generating') && (
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          {status === 'searching' && 'searching project content...'}
          {status === 'generating' && 'generating from project content...'}
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 font-mono text-sm">
          {error || 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* Response */}
      {response && status === 'done' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap mb-4">
            {response.answer}
          </p>

          {/* Sources */}
          {response.sources.length > 0 && (
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                <FileText className="w-3 h-3" />
                Sources
              </div>
              <div className="flex flex-wrap gap-2">
                {response.sources.map((source, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-muted/20 text-muted-foreground rounded text-xs font-mono"
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
