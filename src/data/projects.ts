export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  row: 'flagship' | 'foundations';
}

export const projects: Project[] = [
  // Top Row - Flagship/Passion Projects
  {
    id: 'pickleball-cv',
    title: 'Pickleball CV',
    description: 'Computer vision for sports analytics. Pose estimation, object tracking, and court mapping for shot analysis.',
    tags: ['Computer Vision', 'Pose Estimation', 'Sports'],
    github: '#',
    demo: '#',
    row: 'flagship',
  },
  {
    id: 'spotify-rag',
    title: 'Spotify RAG',
    description: 'Multimodal retrieval system for music search. CLAP embeddings, semantic search, and DJ mix compatibility.',
    tags: ['RAG', 'Audio ML', 'Embeddings'],
    github: '#',
    demo: '#',
    row: 'flagship',
  },
  {
    id: 'aim-vip',
    title: 'AIM VIP Research',
    description: 'NPU hardware acceleration for ML inference. MediaPipe optimization and CPU vs NPU benchmarking.',
    tags: ['Research', 'Hardware ML', 'NPU'],
    github: '#',
    row: 'flagship',
  },

  // Bottom Row - Foundations
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    description: 'This site. AI-powered navigation assistant with RAG retrieval and source-grounded responses.',
    tags: ['Next.js', 'RAG', 'LLM'],
    github: 'https://github.com/teajuw/portfolio',
    row: 'foundations',
  },
  {
    id: 'cv-coursework',
    title: 'CV Coursework',
    description: 'Image classifiers from scratch implementing foundational architectures. SAM 2 augmentation research.',
    tags: ['Deep Learning', 'Research', 'PyTorch'],
    github: '#',
    row: 'foundations',
  },
  {
    id: 'huggingface-clone',
    title: 'HuggingFace Clone',
    description: 'End-to-end ML platform with CI/CD pipelines. AWS deployment and model hosting infrastructure.',
    tags: ['MLOps', 'AWS', 'CI/CD'],
    github: '#',
    row: 'foundations',
  },
];
