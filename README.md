# UIGrid

A simple CLI tool to preview your website on different screen sizes simultaneously.

## Features

- Preview your website across 6 different device sizes at once
- Live reloading when you change files
- Simple CLI interface
- Works with any static website or local development server
- Automatically opens in your default browser

## Device Sizes Included

- iPhone SE (375×667)
- iPhone 14 Pro (393×852)
- iPad Mini (768×1024)
- iPad Pro (1024×1366)
- Desktop HD (1920×1080)
- Desktop 4K (2560×1440)

## Installation

### Global Installation (Recommended)

```bash
npm install -g uigrid
```

### Local Installation

```bash
npm install uigrid
```

## Usage

UIGrid works in two modes:

1. **Directory Mode**: Serves static files from a local directory
2. **URL Mode**: Previews an already-running development server

### Basic Usage - Directory Mode

Navigate to your project directory and run:

```bash
uigrid
```

This will serve the current directory and open the preview in your browser.

### Serve a Specific Directory

```bash
uigrid ./dist
```

### Preview a Running Development Server (URL Mode)

If you already have a dev server running (webpack-dev-server, Vite, Next.js, etc.):

```bash
uigrid http://localhost:8080
```

This will preview your running application across all device sizes without serving any files itself.

### Custom Port

```bash
uigrid -p 4000
```

### Don't Auto-Open Browser

```bash
uigrid --no-open
```

### All Options

```bash
uigrid [target] [options]

Arguments:
  target                 Directory to serve OR URL to preview (default: current directory)
                         Examples: ./dist, http://localhost:8080, https://localhost:3000

Options:
  -p, --port <port>      Port to run the UIGrid server on (default: 3000)
  -n, --no-open          Do not open browser automatically
  -h, --help             Display help
```

## Examples

### Preview a Build Directory

```bash
uigrid ./build
```

### Preview a Vite Dev Server

```bash
# Start your Vite server first (usually on port 5173)
npm run dev

# In another terminal, preview it with UIGrid
uigrid http://localhost:5173
```

### Preview a Next.js App

```bash
# Start your Next.js server first (usually on port 3000)
npm run dev

# In another terminal, use a different port for UIGrid
uigrid http://localhost:3000 -p 4000
```

### Preview Create React App

```bash
# Start your CRA server first (usually on port 3000)
npm start

# In another terminal
uigrid http://localhost:3000 -p 4000
```

### Use a Custom Port

```bash
uigrid -p 5000
```

### Preview Public Folder Without Opening Browser

```bash
uigrid ./public --no-open
```

## How It Works

### Directory Mode
1. UIGrid starts a local Express server
2. Serves your specified directory as static files
3. Opens a browser with a grid layout showing your site at multiple screen sizes
4. Each viewport is an iframe scaled to the appropriate device dimensions

### URL Mode
1. UIGrid starts a local Express server for the preview interface
2. All iframes point directly to your specified URL
3. Your existing development server continues to run independently
4. Perfect for previewing apps with hot module replacement (HMR) or server-side rendering

## Tips

- Make sure your website has an `index.html` file in the root directory
- You can change the URL path in the preview interface to view different pages
- The tool works best with responsive websites
- Press Ctrl+C in the terminal to stop the server

## Use Cases

- Testing responsive designs
- Client presentations
- QA testing across devices
- Development workflow
- Debugging layout issues

## Requirements

- Node.js 14.0.0 or higher

## License

MIT