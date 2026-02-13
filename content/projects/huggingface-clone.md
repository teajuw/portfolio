# HuggingFace Clone

## Overview

A simplified clone of the HuggingFace Hub, supporting model uploads, versioning, and basic inference API. Full-stack project demonstrating modern web development practices.

## Features

### Model Repository
- Upload and version ML models (PyTorch, TensorFlow, ONNX)
- Git-based versioning using git-lfs for large files
- Model cards with markdown documentation
- Download statistics and trending

### Inference API
- REST API for model inference
- Automatic model loading and caching
- Support for common tasks: text-classification, text-generation, image-classification
- Rate limiting and usage quotas

### User System
- Authentication with OAuth (GitHub, Google)
- User profiles and organizations
- Model visibility (public/private)
- Star and bookmark functionality

### Search & Discovery
- Full-text search across model cards
- Filter by task, framework, license
- Trending and most downloaded sections

## Technical Architecture

### Frontend
React SPA with TypeScript. Component library built with Radix UI primitives. State management via React Query for server state, Zustand for client state.

### Backend
FastAPI with async SQLAlchemy. PostgreSQL for metadata, S3-compatible storage for model files. Redis for caching and rate limiting.

### Infrastructure
Docker Compose for local development. GitHub Actions for CI/CD. Deployed on AWS with ECS.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Radix UI
- **Backend:** FastAPI, Python, SQLAlchemy
- **Database:** PostgreSQL, Redis
- **Storage:** MinIO (S3-compatible)
- **Inference:** PyTorch, Transformers library

## API Examples

```python
# Upload a model
POST /api/v1/models
{
  "name": "my-bert-classifier",
  "task": "text-classification",
  "framework": "pytorch"
}

# Run inference
POST /api/v1/models/username/model-name/inference
{
  "inputs": "This movie was great!"
}
```

## Status

Core functionality complete. Demo available. Documentation in progress.

## Keywords

HuggingFace, model hub, machine learning, MLOps, full-stack, React, FastAPI, model inference, API development, web application
