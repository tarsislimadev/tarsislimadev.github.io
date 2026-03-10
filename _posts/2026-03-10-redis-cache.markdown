---
layout: post
title: "Using Redis as a cache database"
date: 2026-03-10 11:50:00 -0300
categories: redis database cache
---
# Using Redis as a cache database

## Run Redis in Docker

```bash
docker run -d -p 6379:6379 redis:alpine
```

## Set a value

```redis
SET a 1
```

## Get a value

```redis
GET a
```

## Get all keys by filter

```redis
KEYS 
```
