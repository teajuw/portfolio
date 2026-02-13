# AIM VIP Research

## Overview

Research project on adversarial machine learning, focusing on robustness of vision transformers against patch attacks. Conducted as part of the AI Mission VIP (Vertically Integrated Project) research program.

## Research Focus

### Adversarial Patch Attacks
Studied how small, specially-crafted image patches can fool state-of-the-art vision models. Unlike pixel-level perturbations, patches are physically realizable and transferable.

### Vision Transformer Vulnerability
Investigated why ViTs may be more or less susceptible to patch attacks compared to CNNs. Explored the role of attention mechanisms in propagating adversarial signals.

### Defense Mechanisms
Evaluated existing defenses:
- Adversarial training
- Patch detection and masking
- Attention-based filtering
- Certified robustness methods

## Methodology

1. Implemented patch attack algorithms (PGD, AutoAttack) for ViT architectures
2. Benchmarked attack success rates across model sizes and patch locations
3. Measured transferability between different ViT variants
4. Proposed attention-guided patch defense mechanism

## Key Findings

- Attention heads in later layers show distinct patterns when processing adversarial patches
- Defense based on attention anomaly detection achieves X% robustness improvement
- Larger patches are more effective but also more detectable

## Tech Stack

- **Frameworks:** PyTorch, timm (PyTorch Image Models)
- **Models:** ViT-B/16, ViT-L/16, DeiT, Swin Transformer
- **Attacks:** PGD, AutoAttack, custom patch optimization
- **Datasets:** ImageNet, CIFAR-10

## Publications & Presentations

- VIP Research Symposium presentation (Spring 2024)
- Technical report submitted to research advisor

## Status

Research phase complete. Documentation and demo materials in progress.

## Keywords

adversarial machine learning, vision transformers, ViT, patch attacks, robustness, deep learning research, computer vision security, adversarial examples, attention mechanisms
