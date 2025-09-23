# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal portfolio website with multiple interactive projects. Each project is self-contained in the `projects/` directory and uses a shared frontend framework and component system.

## Architecture

### Framework and Libraries
- **AFrontend Framework**: Custom frontend framework loaded from CDN (`https://cdn.jsdelivr.net/npm/afrontend@0.0.2/index.js`) via `assets/js/libs/afrontend/index.js`
- **PeerJS**: WebRTC peer-to-peer connections loaded from CDN (`https://esm.sh/peerjs@1.5.4?bundle-deps`) via `assets/js/libs/peerjs/index.js`
- **ES6 Modules**: All projects use native ES6 module imports, no build system required

### Shared Component System
Located in `assets/js/components/`:
- `PageComponent` - Base page class with header/body/footer structure
- `TextComponent` - Text display component
- `TwoColumnsComponent` - Layout component for side-by-side content
- `HeaderComponent`, `FooterComponent` - Page layout components
- All components extend the AFrontend `HTML` class

### Shared Utilities
Located in `assets/js/utils/`:
- `peer.js` - Enhanced PeerJS wrapper with QR code generation for remote control projects
- `events.js` - Event handling utilities
- `url.js` - URL parameter parsing utilities
- `functions.js` - QR code generation and other helper functions

### Project Structure Pattern
Each project typically follows this pattern:
```
projects/project-name/
├── index.html          # Main game/app interface
├── index.js           # Main app logic (exports Page class)
├── controls.html      # Optional: Remote controller interface
├── controls.js        # Optional: Controller logic
└── assets/           # Optional: Project-specific assets
```

### Remote Control Architecture
Many projects support peer-to-peer remote control:
1. Main interface (`index.html`) creates a peer with project-specific ID
2. Displays QR code linking to controller interface
3. Controller (`controls.html`) connects via URL parameter `?id=<peer-id>`
4. Messages sent from controller to main interface via WebRTC

## Development Commands

### Linting
```bash
# From repository root
npx eslint projects/**/*.js

# From individual project directory
npx eslint **/*.js
```

### Local Development
```bash
# Serve locally (required for ES6 modules)
python -m http.server 8000
# or
npx serve .
```

### Dependencies
The repository uses minimal dependencies:
- `eslint` and `globals` for code linting
- All runtime dependencies loaded from CDN

## Code Conventions

### Import Patterns
- Always use relative paths to shared assets: `../../assets/js/...`
- Components imported from `../../assets/js/components/`
- Utils imported from `../../assets/js/utils/`
- Framework imported from `../../assets/js/libs/afrontend/index.js`

### Page Component Pattern
```javascript
import { PageComponent } from '../../assets/js/components/page.component.js'

export class Page extends PageComponent {
  getBodyComponent() {
    // Return component tree for page body
  }
}
```

### Event Communication
- Use `EventTarget` for internal component communication
- Use `this.addEventListener()` and `this.dispatch()` for component events
- Use PeerJS for cross-device communication

### Peer-to-Peer Projects
- Main interface uses `createJustNewPeer(projectName)`
- Controller uses `new Peer()` and connects via `peer.connect(id)`
- QR codes automatically generated with controller URL

## File Organization
- `/projects/` - Individual project directories (90+ projects)
- `/assets/js/` - Shared JavaScript libraries, components, and utilities
- `/docs/` - Documentation and guides
- `/api/` - API-related projects and configs
- Root level contains main portfolio page and configuration