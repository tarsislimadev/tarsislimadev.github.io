---
layout: post
title: "How to Run Ollama on Docker: A Quick Guide"
date: 2026-03-23 08:45:00 -0300
categories: [Automation, Docker, AI, Tips]
---

# How to Run Ollama on Docker

Running LLMs locally has never been easier. **Ollama** is a powerful tool that allows you to run open-source large language models (LLMs) right on your machine. By using **Docker**, you can keep your environment clean and manageable while taking advantage of containerization.

In this guide, we'll walk through the simple steps to get Ollama up and running in a Docker container.

---

## 1. Deploy the Ollama Container

The first step is to pull the official Ollama image and start a container. This command handles the setup, including persistent storage and port mapping.

```bash
# Run the Ollama Docker container
docker run -d \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama
```

### What does this command do?
- `-d`: Runs the container in detached (background) mode.
- `-v ollama:/root/.ollama`: Creates a Docker volume. This ensures your downloaded models are saved even if the container is stopped or removed.
- `-p 11434:11434`: Maps port 11434 from the container to your host system, allowing you to interact with the Ollama API locally.
- `--name ollama`: Assigns a friendly name to the container for easier management.

---

## 2. Interact with Your Models

Once the container is running, you can start executing models immediately. Use the `docker exec` command to communicate with the Ollama instance inside the container.

### Run Llama 3.2 (1B)
A lightweight and fast model suitable for various tasks:
```bash
docker exec -it ollama ollama run llama3.2:1b
```

### Run Qwen 2.5 Coder (0.5B)
A specialized model focused on coding assistance:
```bash
docker exec -it ollama ollama run qwen2.5-coder:0.5b
```

---

## Conclusion

By leveraging Docker, you've successfully created a portable and isolated environment for local AI development. With Ollama's extensive model library, the possibilities for automation and local LLM integration are endless.

Happy coding!
