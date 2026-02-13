import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import ChatTrigger from "@/components/ChatTrigger";

const projects = [
  {
    title: "Pickleball CV",
    description: "Computer vision system for tracking pickleball gameplay, analyzing shots, and generating automated highlights from video footage.",
    tags: ["Python", "OpenCV", "PyTorch"],
    progress: 80
  },
  {
    title: "Spotify RAG",
    description: "Retrieval-Augmented Generation system for Spotify data, allowing natural language queries about music taste and playlist generation.",
    tags: ["LLM", "Vector DB", "Spotify API"],
    progress: 40
  },
  {
    title: "AIM VIP Research",
    description: "Research project on adversarial machine learning, focusing on robustness of vision transformers against patch attacks.",
    tags: ["Research", "Deep Learning"],
    progress: 60
  },
  {
    title: "Portfolio Site",
    description: "Personal portfolio website designed to showcase projects and research with a clean, warm aesthetic.",
    tags: ["Design", "HTML/CSS"],
    progress: 90
  },
  {
    title: "CV Coursework",
    description: "Collection of computer vision implementations including SLAM, optical flow, and 3D reconstruction algorithms.",
    tags: ["C++", "Vision", "Algorithms"],
    progress: 50
  },
  {
    title: "HuggingFace Clone",
    description: "A simplified clone of the HuggingFace Hub, supporting model uploads, versioning, and basic inference API.",
    tags: ["Full Stack", "React", "FastAPI"],
    progress: 30
  }
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1200px] mx-auto px-5 py-16 relative">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <Footer />
      <ChatTrigger />
    </main>
  );
}
