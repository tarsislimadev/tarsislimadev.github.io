---
layout: post
title: "Convert files using AI"
date: 2026-03-21 08:00:00 -0300
categories: automation docker ai tips
---
# Convert files using AI

## Text to Speech

```bash
docker run -v .:/files -w /files -e input=file.txt -e output=file.wav tmvdl/ai:txt2wav
```
