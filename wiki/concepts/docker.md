---
type: concept
slug: docker
title: "Docker"
description: "I use Docker to create, manage, and deliver applications across various hardware platforms and environments."
posts: [sklearn19, agenticaiforprofessionals3, agenticaiforprofessionals2, promptflow2, amazonecs, mssqlserver, docker]
status: current
checked: "2026-11-06"
source_hash: "5757602f78b5"
generated_by: gemma4:12b
---

**Summary.** I use Docker to create, manage, and deliver applications across various hardware platforms and environments. I demonstrate how Docker simplifies the deployment of everything from database instances to complex machine learning and AI systems.

## The idea
- Docker provides a way to package applications into images for consistent deployment.
- Docker Hub serves as a cloud repository for sharing these container images.
- Docker allows for the local execution of complex stacks using Docker Compose.
- Docker containers can host diverse technologies like SQL Server, Prompt Flow, and machine learning models.
- Docker images can be built to support multiple architectures for broader compatibility.

## Claims
- Docker provides an easy way to create, manage, and deliver applications.
  > "Docker Hub is a cloud based repository that allows users to share container images." — docker
- The entire stack runs locally using Docker Compose and a FastAPI backend.
  > "Every beat above ran against the full stack live on a Docker Compose setup on the M4 MacBook Air from Part 2 — Postgres/pgvector, the FastAPI backend, and the React frontend, all local, no cloud dependency for any of it:" — agenticaiforprofessionals3
- I demonstrate how to set up and interact with a Microsoft SQL Server instance using Docker.
  > "I downloaded and ran the amd64 Docker image from https://hub.docker.com/_/microsoft-mssql-server" — mssqlserver
- I demonstrate how to run a Prompt Flow application inside a Docker container.
  > "I used Prompt flow for Visual Studio Code to create and run a flow in a Docker container" — promptflow2
- I used a specific command to build and push a multi-architecture image to Docker Hub.
  > "*I used docker to build an image and to upload the image to dockerhubdocker buildx build --platform linux/amd64,linux/arm64 --rm -t haddley/flow:latest --push .*" — promptflow2
- The haddley/blog image supports multiple Operating System/Architectures.
  > "Since the haddley/blog image has been published using multiple Operating System/Architectures an image can be pulled from Docker Hub and run on a Raspberry Pi computer." — docker

## What I concluded
Docker is a versatile tool that ensures consistency across different environments and hardware architectures. It enables the seamless integration of databases, AI models, and application logic into a unified, portable stack.
