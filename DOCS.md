# Tarsis Lima - Personal Blog & Technical Portfolio

This repository contains the source code, posts, assets, and configuration for the personal website and technical blog of **Tarsis Lima** (`@tarsislimadev`), hosted at [tarsislimadev.github.io](https://tarsislimadev.github.io). 

---

## 🚀 Project Overview

The website serves as a technical portfolio and writing space for sharing tutorials, guides, and project updates. The content ranges from local AI deployment, containerization, system automation, scripting (PowerShell), and software engineering practices to game development and mobile application design.

---

## 🛠️ Technology Stack

The project is built on the following technologies:

- **Static Site Generator**: [Jekyll](https://jekyllrb.com/) - written in Ruby, allowing posts to be authored in Markdown and generated into static HTML pages.
- **Layout Theme**: [Minima](https://github.com/jekyll/minima) - a clean, responsive, and minimalist theme default to Jekyll.
- **Plugins**:
  - `jekyll-feed` - Auto-generates an Atom/RSS feed for blog posts.
- **Development Environment**: Containerized via **Docker** to bypass local Ruby and dependency setups.
- **Hosting**: **GitHub Pages** with custom domain routing.

---

## 📁 Directory Structure

Below is an overview of the key directories and files in this repository:

```text
├── .git/                      # Git repository tracking history
├── .gitignore                 # Files/folders ignored by Git
├── 404.html                   # Custom "404 Not Found" page
├── CNAME                      # Custom domain configuration for GitHub Pages
├── Gemfile                    # Ruby dependencies listing (Jekyll, Minima, etc.)
├── Gemfile.lock               # Locked Ruby dependencies version mapping
├── README.md                  # Quick-start documentation for local execution
├── DOCS.md                    # Detailed documentation of the project structure and posts (this file)
├── _config.yml                # Core Jekyll site configuration file
├── _posts/                    # Blog articles written in Markdown
├── about.markdown             # "About Me" page with social links
├── assets/                    # Static assets (images, JavaScript scripts, mock API endpoints)
│   ├── api/                   # Local mock APIs / JSON data index files
│   ├── images/                # Visual content and illustrations embedded in posts
│   └── product.js             # Client-side JavaScript for handling product lists
├── chess-android-app.html     # Dedicated info page for the Chess Android game
├── index.markdown             # Landing page structure (utilizes the home layout)
└── privacy-policy.html        # App/site privacy policy page
```

---

## 📝 Configuration & Core Settings

### `_config.yml`
This file configures global variables used across templates, layouts, and plugins:
- **Title**: `Tarsis Lima`
- **Description**: `The best Full Stack Developer`
- **Theme**: `minima`
- **URLs**:
  - `url`: `http://tarsislimadev.github.io`
  - `baseurl`: `""` (root path)
- **Social Usernames**: Configured for Twitter (`tarsislimadev`) and GitHub (`tarsislimadev`).

---

## 📚 Blog Articles (`_posts/`)

The core of the site lies in the `_posts/` directory. Articles are written in markdown format using standard Jekyll front-matter metadata (layout, title, date, categories). 

The content is categorized into several domains:

### 1. Artificial Intelligence (AI) & Machine Learning
*   **Ollama (Docker Integration)** (`2026-03-23-docker-ollama.markdown`): Guide on containerizing Ollama to run lightweight language models like Llama 3.2 (1B) and Qwen 2.5 Coder (0.5B) locally.
*   **VS Code & Ollama** (`2026-03-20-vscode-ollama.markdown`): Practical setups for running offline coding assistance inside Visual Studio Code.
*   **AI Study / Neural Networks** (`2026-03-04-about-ai.markdown`): Reflections and notes on neural network models while studying Artificial Intelligence at Fatec Rio Claro. Covers the "Asteroid" game clone project using `Synaptic.js` and `Three.js`.
*   **AI Converter** (`2026-03-21-ai-converter.markdown`): Exploration/tools for file and format transformations leveraging AI models.

### 2. DevOps & Workflow Automation
*   **n8n Workflow Engine** (`2026-03-09-run-n8n.markdown`): Deploying the open-source workflow automation engine n8n locally.
*   **Localtunnel** (`2026-03-14-localtunnel-httpserver.markdown`): Quick setup instructions for exposing local development HTTP servers to the public web via HTTPS.

### 3. Scripting & Operating System Tips
*   **Windows PowerShell Basics** (`2026-03-17-windows-powershell.markdown`): Reference sheet for system command-lets, loop controls, file manipulation, and variables.
*   **Advanced PowerShell Scripting** (`2026-03-17-advanced-powershell.markdown`): Deeper dive into custom functions, modules, error handling, pipeline manipulation, and performance monitoring.
*   **Conda Environment Tips** (`2026-03-30-conda-tips.markdown`): Cheat-sheet commands for managing environments and packages under Anaconda/Miniconda.
*   **Devcontainers** (`2026-04-08-devcontainer-tips.markdown`): Tips for writing and configuring reproducible development environment templates within VS Code containers.

### 4. Technical Tutorials & How-To Guides
*   **Node.js Installation** (`2026-03-09-install-nodejs.markdown`): Step-by-step setup guides for developers starting node environments.
*   **Flutter Installation** (`2026-03-07-install-flutrer.markdown`): Instructions for establishing the Flutter SDK for cross-platform app development.
*   **Redis Caching** (`2026-03-10-redis-cache.markdown`): Best practices for caching mechanisms.
*   **YouTube Video Downloader** (`2026-03-16-download-youtube.markdown`): Command-line script execution tutorials using libraries/tools like `yt-dlp` or similar tools for offline media downloads.
*   **Azure CLI & Commands** (`2026-04-16-az-tips.markdown`): Collection of helpful commands for managing Microsoft Azure resources via command-line.
*   **Miscellaneous Tools**: Git tips (`2026-02-26-git-tips.markdown`), SQL tips (`2026-03-06-sql-tips.markdown`), and common MIME type references (`2026-04-16-mime-types.markdown`).

---

## 🛠️ Local Development Guide

Since Jekyll depends on Ruby and its gems, the recommended way to preview changes locally is via **Docker** to prevent environment conflicts.

### Step 1: Start the Jekyll Container
Execute the following command in the project root directory using a terminal (e.g. Git Bash, PowerShell, or command prompt):

```bash
docker run --rm -it --network host -w /app -v .:/app jekyll/jekyll:stable bash
```
*   `--rm`: Automatically deletes the container when stopped.
*   `-it`: Runs the container interactively.
*   `--network host`: Binds network interfaces directly so port bindings are accessible directly via `localhost`.
*   `-w /app`: Sets the working directory inside the container to `/app`.
*   `-v .:/app`: Mounts the current repository folder to `/app` inside the container.

### Step 2: Serve the Blog
Once you are inside the container's interactive shell, spin up the Jekyll local server:

```bash
jekyll serve
```
By default, the site will compile and be served at `http://localhost:4000/`. The server has livereload and watches file changes to rebuild the static pages on the fly.

---

## 🚀 Deployment

The blog is served via **GitHub Pages**:
1. When changes are pushed to the `main`/`master` branch, GitHub automatically executes a build actions pipeline to build the Jekyll site.
2. A custom domain mapping exists in the [CNAME](file:///C:/Users/tarsi/github.com/tarsislima/tarsislimadev.github.io/CNAME) file pointing to `tarsislima.dev` or a corresponding domain name. Ensure that any custom DNS records are pointed to GitHub Pages servers.
