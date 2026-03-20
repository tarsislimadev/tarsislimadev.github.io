---
layout: post
title: "Use Ollama on VSCode"
date: 2026-03-20 06:00:00 -0300
categories: automation vscode ollama ai tips
---
# Use Ollama models on VSCode plugin

## VSCode plugin

https://marketplace.visualstudio.com/items?itemName=10nates.ollama-autocoder

## Ollama model (Qwen 2.5)

https://ollama.com/library/qwen2.5-coder

```bash
ollama run qwen2.5-coder:0.5b
```

## .vscode\settings.json

```json
{
  "editor.tabSize": 2,
  "ollama-autocoder.temperature": 1,
  "ollama-autocoder.model": "qwen2.5-coder:0.5b",
  "ollama-autocoder.completion keys": " ",
  "ollama-autocoder.max tokens predicted": 20000,
  "ollama-autocoder.preview max tokens": 500,
  "ollama-autocoder.prompt window size": 1310720
}
```
