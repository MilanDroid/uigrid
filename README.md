# UIGrid

A simple CLI tool to preview your website on different screen sizes simultaneously.

## Features

- Preview any URL across 6 different device sizes at once
- Simple CLI interface
- Optional built-in static file server for local directories
- Works with any development server (Vite, Next.js, Create React App, etc.)
- Automatically opens in your default browser

## Device Sizes Included

- iPhone SE (375×667)
- iPhone 14 Pro (393×852)
- iPad Mini (768×1024)
- iPad Pro (1024×1366)
- NetHub (1024x600)
- Desktop (1366x720)
- Desktop HD (1920×1080)
- Desktop 4K (2560×1440)

## Installation

### Global Installation (Recommended)

```bash
npm install -g uigrid-view
```

### Local Installation

```bash
npm install uigrid-view
```

## Usage

UIGrid provides a responsive preview interface that can display any URL across multiple device sizes. Optionally, you can have UIGrid start a local file server for a directory.

### Basic Usage

Start UIGrid without serving any files:

```bash
uigrid-view
```

Then enter any URL in the browser interface (e.g., `http://localhost:3000`, `https://example.com`).

### Serve a Local Directory

Start UIGrid and automatically serve a directory on `localhost`:

```bash
uigrid-view ./dist
```

This will:
- Start the UIGrid preview on port `3000`
- Start a file server for `./dist` on port `3001`
- Pre-populate the URL input with `http://localhost:3001`

### Custom Port

```bash
uigrid-view ./dist -p 5000
```

This will:
- Start UIGrid preview on port `5000`
- Start file server on port `5001`

### Don't Auto-Open Browser

```bash
uigrid-view --no-open
```

### Command Options

```bash
uigrid-view [directory] [options]

Arguments:
  directory              Optional directory to serve via localhost

Options:
  -p, --port <port>      Port for the UIGrid preview (default: 3000)
                         File server uses port + 1 if directory provided
  -n, --no-open          Do not open browser automatically
  -h, --help             Display help
```

## Examples

### Preview Local Static Files

Serve a directory and preview it:

```bash
uigrid-view ./build
```

UIGrid will:
- Preview interface: `http://localhost:3000`
- File server: `http://localhost:3001` (automatically loaded)

### Preview a Vite Dev Server

```bash
# Start your Vite server (usually on port 5173)
npm run dev

# In another terminal, start UIGrid
uigrid-view
```

Then enter `http://localhost:5173` in the UIGrid interface.

### Preview a Next.js App

```bash
# Start Next.js (usually on port 3000)
npm run dev

# In another terminal, start UIGrid on a different port
uigrid-view -p 4000
```

Then enter `http://localhost:3000` in the UIGrid interface.

### Preview Create React App

```bash
# Start CRA (usually on port 3000)
npm start

# In another terminal, start UIGrid on a different port
uigrid-view -p 5000
```

Then enter `http://localhost:3000` in the UIGrid interface.

### Serve Multiple Directories

You can run multiple instances of UIGrid to serve different directories:

```bash
# Terminal 1: Serve project A
uigrid-view ./project-a -p 3000
# File server on 3001

# Terminal 2: Serve project B
uigrid-view ./project-b -p 4000
# File server on 4001
```

Then you can compare both projects by switching URLs in the interface.

## How It Works

1. UIGrid starts an Express server for the preview interface on your specified port (default: 3000)
2. If you provide a directory, UIGrid starts a second Express server on port + 1 (default: 3001) to serve those static files
3. The preview interface displays a grid of 6 iframes, each scaled to different device dimensions
4. Enter any URL in the input field to load it across all device sizes simultaneously
5. All iframes point to the URL you specify - either your file server, dev server, or any other URL

## Tips

- You can change the URL in the preview interface at any time to load different sites
- When serving a directory, make sure it has an `index.html` file in the root
- If using a custom port with `-p`, remember the file server will use port + 1
- Works great with development servers that have hot module replacement (HMR)
- You can preview any publicly accessible URL, not just localhost
- Press Ctrl+C in the terminal to stop all servers

## Use Cases

- Testing responsive designs
- Client presentations
- QA testing across devices
- Development workflow
- Debugging layout issues

## Requirements

- Node.js 14.0.0 or higher

## License

GPL-3.0