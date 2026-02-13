"use client";

interface MetricCardProps {
  value: string;
  label: string;
  subtext?: string;
}

export default function MetricCard({ value, label, subtext }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 text-center">
      <div className="text-3xl font-bold font-mono text-primary mb-1">
        {value}
      </div>
      <div className="text-sm font-medium text-foreground">
        {label}
      </div>
      {subtext && (
        <div className="text-xs text-muted-foreground mt-1">
          {subtext}
        </div>
      )}
    </div>
  );
}

interface MetricGridProps {
  metrics: MetricCardProps[];
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {metrics.map((metric, i) => (
        <MetricCard key={i} {...metric} />
      ))}
    </div>
  );
}
