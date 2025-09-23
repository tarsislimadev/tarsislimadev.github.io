# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a "forca" (hangman) game that uses peer-to-peer connections for remote control. The project consists of a main game interface and a separate controls interface that connects via WebRTC using PeerJS.

## Architecture
- **Main Game**: `index.html` + `index.js` - Creates the game interface that displays QR code and receives messages from controllers
- **Controller**: `controls.html` + `controls.js` - Provides button interface that connects to the main game via peer ID
- **Shared Framework**: Uses a custom frontend framework located at `../../assets/js/libs/afrontend/`
- **Component System**: Built on shared components from `../../assets/js/components/` including:
  - `PageComponent` - Base page class
  - `TextComponent` - Text display
  - `TwoColumnsComponent` - Layout component

## Key Dependencies
- Custom `afrontend` library for DOM manipulation and components
- PeerJS for WebRTC peer-to-peer connections
- Shared utilities from `../../assets/js/utils/` for peer management, events, and URL handling

## Development Commands
```bash
# Lint code (from projects directory)
npx eslint **/*.js

# Serve locally (requires HTTP server for ES6 modules)
python -m http.server 8000
# or
npx serve .
```

## File Structure
- `index.html` / `index.js` - Main game interface (host)
- `controls.html` / `controls.js` - Controller interface (client)
- `image.jpg` - Game image asset
- Configuration inherits from `../eslint.config.mjs`

## Connection Flow
1. Main game creates peer with ID 'forca'
2. Controller gets peer ID from URL parameter `?id=<peer-id>`
3. Controller connects to main game peer
4. Button clicks in controller send messages to main game
5. Main game displays received text messages

## Testing
No automated tests. Manual testing requires:
1. Open `index.html` in browser
2. Note the peer ID displayed
3. Open `controls.html?id=<peer-id>` in another browser/device
4. Test button interactions