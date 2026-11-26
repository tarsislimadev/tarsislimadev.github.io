---
layout: post
title: "Install Anaconda with Winget"
date: 2026-11-26 20:52:00 -0300
categories: python anaconda windows winget install
---
# Install Anaconda with Winget

Anaconda includes Python and Conda, making it easy to create isolated environments for data science and other Python projects. On Windows, you can install the Anaconda Distribution from the command line with Winget.

## Install Anaconda

Open PowerShell or Windows Terminal and run:

```powershell
winget install Anaconda.Anaconda3
```

Follow any prompts from the installer. When installation is complete, open **Anaconda Prompt** from the Start menu.

## Verify the installation

In Anaconda Prompt, check that Conda is available:

```bash
conda --version
```

You can also view the installation details with:

```bash
conda info
```

## Create and activate an environment

Create a separate environment for a project, then activate it:

```bash
conda create --name my-project python=3.12
conda activate my-project
```

Install packages into the active environment as needed:

```bash
conda install numpy pandas
```
