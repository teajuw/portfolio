# Pickleball CV

## Demo

Video demo coming soon - will show shot tracking and highlight generation.

## Overview

Computer vision system for tracking pickleball gameplay, analyzing shots, and generating automated highlights from video footage. Built to demonstrate real-time video analysis and sports analytics capabilities.

## How It Works

### Pose Estimation
Uses MediaPipe BlazePose for real-time pose estimation, detecting 33 body landmarks per frame. The pose data enables stroke classification and player movement analysis.

### Object Tracking
Ball tracking uses a combination of color segmentation and Kalman filtering for smooth trajectory prediction. Court line detection uses Hough transforms for perspective calibration.

### Shot Classification
A custom PyTorch classifier trained on annotated gameplay footage categorizes shots into:
- Serves (underhand, drive)
- Dinks
- Volleys
- Groundstrokes
- Lobs

### Highlight Generation
Automatic highlight detection based on rally length, shot variety, and point outcomes. FFmpeg handles video clipping and compilation.

## What I Learned

- **Multi-model coordination:** Running pose estimation, ball tracking, and classification simultaneously requires careful threading and frame synchronization.
- **Sports-specific challenges:** Pickleball balls are small and fast. Off-the-shelf trackers fail. Custom color filtering + motion prediction was necessary.
- **Annotation is expensive:** Training shot classifiers required manually labeling hundreds of clips. Active learning helped prioritize which samples to annotate.

## Tech Stack

- **Computer Vision:** OpenCV, MediaPipe
- **Deep Learning:** PyTorch, torchvision
- **Video Processing:** FFmpeg, moviepy
- **Language:** Python 3.10+

## Challenges

The main challenge was maintaining real-time performance (30fps) while running multiple vision models. Solved by:
1. Running pose estimation and ball tracking in parallel threads
2. Using TensorRT for model optimization
3. Frame skipping with interpolation for non-critical analysis

## Status

Currently paused. Core tracking and classification work well. Next steps would be building a proper UI and adding multi-camera support.

## Keywords

computer vision, pose estimation, object tracking, sports analytics, video analysis, real-time processing, PyTorch, OpenCV, MediaPipe, deep learning
