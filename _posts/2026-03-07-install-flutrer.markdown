---
layout: post
title:  "Install Flutter"
date:   2026-03-07 17:00:00 -0300
categories: flutter install
---
# Install Flutter

I'm working on a Flutter project and I need to install it on my computer.

To help people to install Flutter, I'm writing this post.

## Clone Flutter repository on Github

```bash
git clone https://github.com/flutter/flutter.git -b stable ~/.bin/flutter
```

## Add Flutter to PATH

```bash
export PATH="$PATH:~/.bin/flutter/bin"
```

## Verify the installation

```bash
flutter --version
```

## In your project, run:

```bash
flutter pub get
```

## Run your project

```bash
flutter run android
```

