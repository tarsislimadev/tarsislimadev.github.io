---
layout: post
title: "Use Ollama on Docker"
date: 2026-03-23 08:45:00 -0300
categories: automation docker ai tips
---
# Use Ollama on Docker

## Run image Ollama on Docker contianer

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

## Run Ollama model

```bash
docker exec -it ollama ollama run llama3.2:1b
```
