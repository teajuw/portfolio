# 3rd Shot

## Demo

Video demo coming soon - will show a rally reconstructed in 3D that you can orbit.

## Overview

A pipeline that turns single-camera broadcast video of a pickleball match into a 3D digital twin: the court, four moving bodies, their paddles and the ball, all in real units. It runs offline on an Apple Silicon Mac. The longer aim is a simulator that learned agents can play in.

It is a research project, and every stage has a write-up of what was measured, including what did not work.

## How It Works

### Court and Camera
The court lines give a camera calibration, so every pixel maps to a line of sight in court feet. Everything else is measured against that.

### Players and Ball in 2D
A keypoint detector tracks the four players and places their feet on the court. A separate tracker follows the ball, and a decoder combines ball motion, player distance and audio to find hits and bounces.

### 3D Ball Path
One camera cannot see depth, so the ball's 3D path is solved with physics: each flight between a hit and a bounce has to obey gravity, drag and the floor, and has to match the pixels.

### 3D Bodies
Meta's SAM 3D Body gives a full body mesh per player per frame. The body shape is then fixed per player, the motion is smoothed, and each body is slid along its line of sight until its feet touch the floor.

### Paddles
The paddle is too small and blurred to measure directly, so it is inferred: gripped in the palm, following the forearm, and turned at each hit to the face angle the ball's change of direction requires.

### Ball Simulator and Shot Model
A ball simulator (flight, bounce, paddle impact) is calibrated against tracked flights. A shot-target model predicts where a shot will go as a distribution over the court, given where all four players stand.

## What I Learned

- **Opponent positions predict the shot.** On 659 shots, knowing where the opponents stood improved the prediction about three times as much as knowing where the hitter stood.
- **Held-out scores humble you.** The hit and bounce detector scored 0.95 on the clips it was tuned on and 0.50 on a clip it had never seen.
- **Physics fills in what the camera cannot see.** Depth, paddle angle and ball height all come from constraints, not pixels.
- **Negative results are results.** Describing shots by court geometry, adding spin to the ball model and auto-selecting paddle outlines all failed to help, and the write-ups say so.

## Tech Stack

- **Bodies:** SAM 3D Body (MHR body model), GVHMR for comparison
- **Vision:** YOLO keypoints, OpenCV, SAM 2
- **Numerics:** NumPy, SciPy, PyTorch on Apple GPUs
- **Viewer:** three.js
- **Language:** Python 3.12

## Challenges

Running research models built for NVIDIA GPUs on a Mac took patching: SAM 3D Body now runs at 0.18 seconds per player per frame on an M5 Pro. Ten minutes of footage still takes about six hours, so this is an overnight batch job, not real time.

## Status

Active. One match, one venue and one camera angle so far, and little is checked against hand labels yet. Next: validate the shot table by hand, then calibrate the simulator well enough to predict landings.

## Keywords

3D reconstruction, digital twin, human mesh recovery, SAM 3D Body, sports analytics, physics simulation, monocular video, camera calibration, ball tracking, pickleball, Apple Silicon, PyTorch
