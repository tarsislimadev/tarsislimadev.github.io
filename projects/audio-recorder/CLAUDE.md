# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is an audio recording web application that allows users to record audio from their microphone and download the recordings as WebM files. It's part of a larger portfolio website with multiple interactive projects.

## Architecture

### Framework and Dependencies
- **AFrontend Framework**: Custom frontend framework loaded from CDN (`https://cdn.jsdelivr.net/npm/afrontend@0.0.2/index.js`) via `../../assets/js/libs/afrontend/index.js`
- **ES6 Modules**: Native ES6 module imports, no build system required
- **Web APIs**: Uses MediaRecorder API and getUserMedia for audio recording functionality

### Component System
The application uses shared components from `../../assets/js/components/`:
- `PageComponent` - Base page class with header/body/footer structure
- `ButtonComponent` - Interactive button component
- `TextComponent` - Text display component
- `LinkComponent` - Link/anchor component (extended as `DownloadLinkComponent`)
- `RowComponent` - Layout component for organizing elements

### Utilities
Uses shared utilities from `../../assets/js/utils/`:
- `str.js` - String manipulation functions (specifically `padLeft` for timer formatting)

## Application Structure
- `index.html` - Main page HTML with module loading
- `index.js` - Main application logic with Page class extending PageComponent
- `image.jpg` - Project image asset

## Key Features
- **Audio Recording**: Uses MediaRecorder API to capture audio from user's microphone
- **Real-time Timer**: Shows recording duration with second-by-second updates
- **Download Functionality**: Creates downloadable WebM files with timestamp-based filenames
- **State Management**: Tracks recording state, media recorder instance, and timer

## Development Commands

### Linting
```bash
# From repository root
npx eslint projects/audio-recorder/*.js

# Or from project directory
npx eslint *.js
```

### Local Development
```bash
# Serve locally (required for ES6 modules and MediaRecorder API)
python -m http.server 8000
# or
npx serve .
```

## Code Patterns

### Page Component Pattern
```javascript
import { PageComponent } from '../../assets/js/components/page.component.js'

export class Page extends PageComponent {
  onCreate() {
    super.onCreate()
    this.body.append(/* component tree */)
  }
}
```

### State Management
The Page class uses a state object to manage:
- `is_playing`: Recording status boolean
- `media_recorder`: MediaRecorder instance
- `timer`: Recording duration in seconds
- `id`: setInterval timer ID

### Media Recording Flow
1. User clicks play button → `startRecord()`
2. Request microphone access → `getUserMedia()`
3. Create MediaRecorder instance → `createMediaRecorder()`
4. Start recording and timer → `startMediaRecorder()`, timer interval
5. User clicks stop → `stopRecording()`
6. MediaRecorder dataavailable event → create download link