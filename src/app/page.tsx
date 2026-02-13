export default function Home() {
  return (
    <main className="min-h-screen p-8" style={{ background: 'var(--background)' }}>
      <header className="mb-12">
        <h1 className="font-mono text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          Trevor Wu
        </h1>
        <p style={{ color: 'var(--muted)' }}>ML/AI Engineer</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project cards will go here */}
        <div
          className="p-6 rounded-lg"
          style={{
            background: 'var(--card)',
            boxShadow: '0 4px 12px rgba(26, 24, 50, 0.08)'
          }}
        >
          <h2 className="font-mono font-bold mb-2">Projects coming soon</h2>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            Portfolio under construction
          </p>
        </div>
      </section>

      <footer className="mt-12 text-sm" style={{ color: 'var(--muted)' }}>
        <a href="#" className="mr-4 hover:opacity-80">GitHub</a>
        <a href="#" className="mr-4 hover:opacity-80">LinkedIn</a>
        <a href="#" className="hover:opacity-80">Email</a>
      </footer>
    </main>
  );
}
