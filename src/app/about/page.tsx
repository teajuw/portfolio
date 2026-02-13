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
    title: "Spotify RAG",
    slug: "spotify-rag",
    description: "RAG-powered search over 2,000 songs using dual CLAP audio and sentence embeddings with a two-stage LLM pipeline for natural language music queries.",
    tags: ["RAG", "ChromaDB", "CLAP"],
    status: "wip"
  },
  {
    title: "AIM VIP Research",
    slug: "aim-vip",
    description: "Real-time cello posture analysis on Android using MediaPipe. Achieved 90% latency improvement via Snapdragon NPU acceleration.",
    tags: ["MediaPipe", "Android", "NPU"],
    status: "demo"
  },
  {
    title: "Portfolio Site",
    slug: "portfolio",
    description: "This site. RAG search, LLM-powered project FAQ, build-time embeddings. A live demo of my ML/AI engineering skills.",
    tags: ["Next.js", "RAG", "Groq"],
    status: "wip"
  },
  {
    title: "HuggingFace Clone",
    slug: "huggingface-clone",
    description: "Model registry with Flask API, React frontend, Docker containerization, and AWS deployment. 16,000+ lines on a 4-person team.",
    tags: ["Flask", "AWS", "Docker"],
    status: "demo"
  },
  {
    title: "Pickleball CV",
    slug: "pickleball-cv",
    description: "Computer vision for tracking pickleball gameplay, analyzing shots, and generating automated highlights from video footage.",
    tags: ["Python", "OpenCV", "PyTorch"],
    status: "paused"
  },
  {
    title: "CV Coursework",
    slug: "cv-coursework",
    description: "SLAM, optical flow, 3D reconstruction, and stereo vision implementations from graduate computer vision coursework.",
    tags: ["C++", "OpenCV", "Algorithms"],
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
