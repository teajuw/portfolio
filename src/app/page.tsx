import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

type ProjectStatus = 'done' | 'demo' | 'wip' | 'paused';

interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  status?: ProjectStatus;
}

const projects: Project[] = [
  {
    title: "Pickleball CV",
    slug: "pickleball-cv",
    description: "Computer vision system for tracking pickleball gameplay, analyzing shots, and generating automated highlights from video footage.",
    tags: ["Python", "OpenCV", "PyTorch"],
    status: "paused"
  },
  {
    title: "Spotify RAG",
    slug: "spotify-rag",
    description: "Retrieval-Augmented Generation system for Spotify data, allowing natural language queries about music taste and playlist generation.",
    tags: ["LLM", "Vector DB", "Spotify API"],
    status: "wip"
  },
  {
    title: "AIM VIP Research",
    slug: "aim-vip",
    description: "Research project on adversarial machine learning, focusing on robustness of vision transformers against patch attacks.",
    tags: ["Research", "Deep Learning"],
    status: "demo"
  },
  {
    title: "Portfolio Site",
    slug: "portfolio",
    description: "Personal portfolio website designed to showcase projects and research with a clean, warm aesthetic.",
    tags: ["Design", "HTML/CSS"],
    status: "wip"
  },
  {
    title: "CV Coursework",
    slug: "cv-coursework",
    description: "Collection of computer vision implementations including SLAM, optical flow, and 3D reconstruction algorithms.",
    tags: ["C++", "Vision", "Algorithms"],
    status: "demo"
  },
  {
    title: "HuggingFace Clone",
    slug: "huggingface-clone",
    description: "A simplified clone of the HuggingFace Hub, supporting model uploads, versioning, and basic inference API.",
    tags: ["Full Stack", "React", "FastAPI"],
    status: "demo"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1200px] mx-auto px-5 py-16 relative">
      <Header />
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
