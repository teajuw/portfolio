import DarkLayout from "@/components/ui/dark/DarkLayout";
import { ProjectHeader } from "@/components/ui/dark/ProjectHeader";
import { ContentSection } from "@/components/ui/dark/ContentSection";
import { TechGrid } from "@/components/ui/dark/TechGrid";

// Project Data Registry
const PROJECTS: Record<string, any> = {
  "pickleball-cv": {
    title: "PICKLEBALL CV",
    subtitle: "Computer Vision · Real-time Tracking · Shot Classification",
    tags: ["PYTHON", "OPENCV", "PYTORCH", "YOLOV8"],
    description: "A comprehensive computer vision system designed to track pickleball gameplay in real-time. It identifies players, tracks the ball trajectory, and classifies shots (dinks, drives, lobs) to generate automated highlight reels.",
    features: [
      "Real-time object detection using YOLOv8",
      "Trajectory prediction algorithms",
      "Automated highlight clipping",
      "Player movement heatmap generation"
    ],
    tech: [
      { category: "Core AI", skills: ["PyTorch", "YOLOv8", "OpenCV"] },
      { category: "Backend", skills: ["FastAPI", "Redis", "Celery"] },
      { category: "Visualization", skills: ["Matplotlib", "Streamlit"] }
    ],
    repo: "https://github.com/teajuw/pickleball-cv"
  },
  "spotify-rag": {
    title: "SPOTIFY RAG",
    subtitle: "Semantic Search · Vector Embeddings · Audio Analysis",
    tags: ["PYTHON", "CHROMADB", "OPENAI", "LLE"],
    description: "A semantic search engine for a 2,000+ song library. Unlike traditional keyword search, this uses RAG (Retrieval-Augmented Generation) and dual embeddings (Audio + Lyrics) to find songs based on 'vibe', meaning, or sonic characteristics.",
    features: [
      "Vector database integration with ChromaDB",
      "Hybrid search (Audio features + Lyrical content)",
      "Natural language query understanding",
      "Spotify API integration for playback"
    ],
    tech: [
      { category: "AI/ML", skills: ["OpenAI Embeddings", "CLAP Audio Model", "LangChain"] },
      { category: "Data", skills: ["ChromaDB", "Spotify API"] },
      { category: "Frontend", skills: ["React", "Tailwind CSS"] }
    ],
    repo: "https://github.com/teajuw/spotify-rag"
  },
  "aim-vip-research": {
    title: "REAL-TIME CELLO ANALYTICS",
    subtitle: "Android NPU · Pose Estimation · MediaPipe",
    tags: ["KOTLIN", "ANDROID", "TENSORFLOW LITE", "MEDIAPIPE"],
    description: "Built for the AIM VIP Research Lab, this Android application provides real-time posture feedback for cellists. It leverages the Snapdragon Neural Processing Unit (NPU) to run MediaPipe pose estimation models on-device at 60 FPS with minimal latency.",
    features: [
      "On-device pose estimation (MediaPipe)",
      "Real-time feedback overlay",
      "Session recording and analytics",
      "Optimized for Snapdragon NPU"
    ],
    tech: [
      { category: "Mobile", skills: ["Kotlin", "Jetpack Compose", "CameraX"] },
      { category: "AI", skills: ["TensorFlow Lite", "MediaPipe", "SNPE"] },
      { category: "Hardware", skills: ["Snapdragon NPU"] }
    ],
    repo: "https://github.com/teajuw/aim-vip"
  },
  "portfolio": {
    title: "META PORTFOLIO",
    subtitle: "Next.js · Generative UI · Vercel AI SDK",
    tags: ["NEXT.JS 15", "REACT 19", "TAILWIND V4", "AI SDK"],
    description: "This portfolio itself is a technical showcase. It features a generative UI that adapts to the user's intent, an integrated LLM chatbot that can 'interview' itself, and a fully modern stack using the latest React Server Components patterns.",
    features: [
      "Generative UI with Vercel AI SDK",
      "React Server Components",
      "Dynamic theming engine",
      "RAG-powered conversational interface"
    ],
    tech: [
      { category: "Framework", skills: ["Next.js 15", "React 19"] },
      { category: "Styling", skills: ["Tailwind CSS v4", "Framer Motion"] },
      { category: "AI", skills: ["Vercel AI SDK", "Groq"] }
    ],
    repo: "https://github.com/teajuw/portfolio"
  },
  "huggingface-clone": {
    title: "DISTRIBUTED MODEL REGISTRY",
    subtitle: "Docker · AWS · Flask · System Design",
    tags: ["PYTHON", "DOCKER", "AWS", "REACT"],
    description: "A full-stack clone of the HuggingFace model hub. It allows users to upload, version, and share machine learning models. Built by a team of 4, it simulates a production-grade distributed system with S3 storage, separate metadata services, and a scalable frontend.",
    features: [
      "Model versioning and lineage",
      "S3-compatible blob storage",
      "Distributed architecture (Microservices)",
      "CI/CD pipeline"
    ],
    tech: [
      { category: "Backend", skills: ["Flask", "PostgreSQL", "Redis"] },
      { category: "Infrastructure", skills: ["Docker", "AWS S3", "EC2"] },
      { category: "Frontend", skills: ["React", "Redux"] }
    ],
    repo: "https://github.com/teajuw/huggingface-clone"
  },
  "cv-coursework": {
    title: "3D VISION ALGORITHMS",
    subtitle: "SLAM · Optical Flow · Stereo Vision",
    tags: ["C++", "OPENCV", "EIGEN"],
    description: "A collection of advanced computer coursework projects focusing on the fundamentals of 3D vision. Implemented algorithms from scratch including SLAM (Simultaneous Localization and Mapping), Lucas-Kanade optical flow, and dense stereo reconstruction.",
    features: [
      "Visual Odometry implementation",
      "Dense 3D reconstruction from stereo",
      "Optical Flow tracking",
      "Camera calibration"
    ],
    tech: [
      { category: "Languages", skills: ["C++", "Python"] },
      { category: "Libraries", skills: ["OpenCV", "Eigen", "PCL"] },
      { category: "Concepts", skills: ["Linear Algebra", "Projective Geometry"] }
    ],
    repo: "https://github.com/teajuw/cv-coursework"
  }
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <DarkLayout>
        <div className="h-screen flex items-center justify-center text-white/50 font-mono">
          PROJECT_NOT_FOUND: {slug}
        </div>
      </DarkLayout>
    );
  }

  return (
    <DarkLayout>
      <ProjectHeader
        title={project.title}
        subtitle={project.subtitle}
        tags={project.tags}
        repoUrl={project.repo}
      />

      <div className="space-y-12 pb-24">
        <ContentSection title="Overview">
          <p>{project.description}</p>
        </ContentSection>

        <ContentSection title="Key Features">
          <ul className="list-disc list-inside space-y-2 text-white/70">
            {project.features.map((feat: string, i: number) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="Technical Stack">
          <TechGrid items={project.tech} />
        </ContentSection>
      </div>
    </DarkLayout>
  );
}
