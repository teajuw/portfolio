# CV Coursework

## Overview

Collection of computer vision implementations including SLAM, optical flow, and 3D reconstruction algorithms. Built as part of graduate-level computer vision coursework.

## Implementations

### Visual SLAM
Monocular visual SLAM pipeline implementing:
- Feature detection (ORB, SIFT)
- Feature matching and tracking
- Essential matrix estimation
- Bundle adjustment
- Loop closure detection

### Optical Flow
Dense and sparse optical flow implementations:
- Lucas-Kanade (sparse, feature-based)
- Horn-Schunck (dense, variational)
- Farneback (dense, polynomial expansion)
- Performance comparison on standard benchmarks

### 3D Reconstruction
Structure from Motion (SfM) pipeline:
- Two-view geometry and triangulation
- Multi-view stereo
- Point cloud generation
- Mesh reconstruction

### Image Stitching
Panorama creation using:
- RANSAC for homography estimation
- Cylindrical projection
- Multi-band blending

### Stereo Vision
Depth estimation from stereo pairs:
- Rectification
- Block matching
- Semi-global matching (SGM)
- Depth map post-processing

## Tech Stack

- **Language:** C++17, Python
- **Libraries:** OpenCV, Eigen, g2o, Open3D
- **Visualization:** PCL, matplotlib, Open3D

## Notable Challenges

1. **Bundle Adjustment Optimization:** Implementing efficient Levenberg-Marquardt with sparse Jacobians
2. **Loop Closure:** Bag-of-words approach for place recognition in SLAM
3. **Real-time Performance:** Optimizing feature extraction for 30fps tracking

## Code Quality

- Well-documented with algorithm explanations
- Unit tests for geometric primitives
- Benchmark scripts for performance evaluation

## Status

Coursework complete. Available as reference implementations with documentation.

## Keywords

computer vision, SLAM, optical flow, 3D reconstruction, structure from motion, stereo vision, C++, OpenCV, image processing, algorithms
