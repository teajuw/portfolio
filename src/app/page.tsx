import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';

export default function Home() {
  const flagshipProjects = projects.filter(p => p.row === 'flagship');
  const foundationProjects = projects.filter(p => p.row === 'foundations');

  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-16" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="mb-12">
        <h1 className="font-mono text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
          Trevor Wu
        </h1>
        <p style={{ color: 'var(--muted)' }}>ML/AI Engineer</p>
      </header>

      {/* Project Grid */}
      <section className="mb-16">
        {/* Flagship Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {flagshipProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Foundations Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foundationProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm" style={{ color: 'var(--muted)' }}>
        <a href="https://github.com/teajuw" className="mr-4 hover:opacity-80">GitHub</a>
        <a href="#" className="mr-4 hover:opacity-80">LinkedIn</a>
        <a href="#" className="hover:opacity-80">Email</a>
      </footer>
    </main>
  );
}
