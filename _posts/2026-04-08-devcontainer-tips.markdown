---
layout: post
title: "Dev Container Tips"
date: 2026-04-08 08:45:00 -0300
categories: automation dev-container cli tips
---
# Dev Container Tips

## 1. Use `.devcontainer/devcontainer.json` for Configuration
Define your development environment declaratively in `devcontainer.json`. This ensures consistency across team members and CI/CD pipelines.

```json
{
  "name": "My Dev Environment",
  "image": "mcr.microsoft.com/devcontainers/base:jammy",
  "features": {
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/node:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": ["eslint.vscode-eslint", "prettier.prettier-vscode"]
    }
  }
}
```

## 2. Mount Source Code as Volume
Always mount your source code as a volume to preserve changes:

```json
{
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached",
  "workspaceFolder": "/workspace"
}
```

## 3. Pre-build Dev Container Images
Reduce startup time by pre-building container images instead of building from scratch:

```json
{
  "build": {
    "dockerfile": "Dockerfile",
    "context": "."
  }
}
```

## 4. Use `forwardPorts` for Service Access
Expose and forward ports to access services running in the container:

```json
{
  "forwardPorts": [3000, 5432, 8080],
  "portsAttributes": {
    "3000": {"label": "App", "onAutoForward": "notify"},
    "5432": {"label": "Database", "onAutoForward": "silent"}
  }
}
```

## 5. Leverage `postCreateCommand` for Setup
Automate dependency installation and setup tasks after container creation:

```json
{
  "postCreateCommand": "npm install && npm run build"
}
```

## 6. Share Environment Variables Securely
Use `.devcontainer/.env` for local development (gitignored) and `.devcontainer/devcontainer.json` for shareable configurations:

```json
{
  "remoteEnv": {
    "NODE_ENV": "development"
  }
}
```

## 7. Install Additional Tools with `features`
Use the official Dev Container features to install tools without custom Dockerfiles:

```json
{
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {}
  }
}
```

## 8. Optimize for Performance
Use `.dockerignore` to reduce build context and leverage buildkit for faster builds:

```dockerfile
node_modules
*.log
.git
.env
```

## 9. Use Remote Containers CLI
Manage containers from the command line using VS Code Remote:

```bash
devcontainer open
devcontainer exec npm test
devcontainer build
```

## 10. Keep Dependencies Up to Date
Regularly update base images and features in your `devcontainer.json`:

```bash
docker pull mcr.microsoft.com/devcontainers/base:latest
```


