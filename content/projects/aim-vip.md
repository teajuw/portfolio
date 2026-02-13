# AIM VIP Research

## Demo

Video demo coming soon - will show real-time posture analysis on Android.

## Overview

Real-time posture analysis application for cellists, developed over 1.5 years at Purdue's AIM Lab. Uses pose estimation to provide natural language feedback on playing technique.

## How It Works

### Pose Estimation
MediaPipe BlazePose detects body landmarks in real-time video. Custom preprocessing handles the specific requirements of seated cello playing posture.

### NPU Acceleration
Re-engineered the MediaPipe inference pipeline for Snapdragon NPU hardware acceleration:
- Custom preprocessing stage
- Model quantization for NPU
- BlazePose optimization
- Pose anchor refinement

Achieved 90% latency improvement over CPU execution with significant thermal reduction on-device.

### Feedback Generation
Pose data is analyzed against proper cello technique. Natural language feedback helps musicians correct their posture in real-time.

## Tech Stack

- Python, Android (Kotlin)
- MediaPipe, BlazePose
- PyTorch, TensorFlow
- Snapdragon NPU optimization
- Quantization techniques

## Metrics

- 90% latency improvement vs CPU
- Real-time on mobile device
- 1.5 years of research
- NPU hardware acceleration

## Status

Research phase complete. Android application functional. Documentation in progress.

## Keywords

pose estimation, MediaPipe, BlazePose, Android, NPU acceleration, quantization, real-time, computer vision, music technology, cello
