import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

const projects = [
  {
    title: "Pickleball CV",
    description: "Computer vision system for tracking pickleball gameplay, analyzing shots, and generating automated highlights from video footage.",
    tags: ["Python", "OpenCV", "PyTorch"]
  },
  {
    title: "Spotify RAG",
    description: "Retrieval-Augmented Generation system for Spotify data, allowing natural language queries about music taste and playlist generation.",
    tags: ["LLM", "Vector DB", "Spotify API"]
  },
  {
    title: "AIM VIP Research",
    description: "Research project on adversarial machine learning, focusing on robustness of vision transformers against patch attacks.",
    tags: ["Research", "Deep Learning"]
  },
  {
    title: "Portfolio Site",
    description: "Personal portfolio website designed to showcase projects and research with a clean, warm aesthetic.",
    tags: ["Design", "HTML/CSS"]
  },
  {
    title: "CV Coursework",
    description: "Collection of computer vision implementations including SLAM, optical flow, and 3D reconstruction algorithms.",
    tags: ["C++", "Vision", "Algorithms"]
  },
  {
    title: "HuggingFace Clone",
    description: "A simplified clone of the HuggingFace Hub, supporting model uploads, versioning, and basic inference API.",
    tags: ["Full Stack", "React", "FastAPI"]
  }
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1200px] mx-auto px-5 py-16">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
