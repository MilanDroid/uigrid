# UIGrid

Preview a website on eight screen sizes at once. One command opens a grid of device frames, all pointed at the same URL, so a responsive bug shows up in the frame where it breaks.

[![npm](https://img.shields.io/npm/v/uigrid-view)](https://www.npmjs.com/package/uigrid-view)

## Install

Requires Node.js 14 or later.

```bash
npm install -g uigrid-view
```

## Use

```bash
uigrid
```

This opens the grid at http://localhost:3000. Type any URL into the URL bar, and every frame loads it.

To have UIGrid serve a folder for you:

```bash
uigrid ./dist
```

This serves `./dist` on port 3001 and loads it into the grid.

| Option | Meaning | Default |
|---|---|---|
| `[directory]` | Folder to serve on the grid's port + 1 | none |
| `-p`, `--port <port>` | Port for the grid | `3000` |
| `-n`, `--no-open` | Don't open the browser automatically | browser opens |

### With your dev server

Start your dev server as usual, then start UIGrid on a port your dev server isn't using:

```bash
npm run dev        # e.g. Next.js on http://localhost:3000
uigrid -p 4000     # grid on http://localhost:4000
```

Then enter `http://localhost:3000` in the grid. Hot reload keeps working in every frame.

## Devices

| Device | Width × height |
|---|---|
| iPhone SE | 375 × 667 |
| iPhone 14 Pro | 393 × 852 |
| iPad Mini | 768 × 1024 |
| iPad Pro | 1024 × 1366 |
| Nethub | 1024 × 600 |
| Desktop | 1366 × 720 |
| Desktop HD | 1920 × 1080 |
| Desktop 4K | 2560 × 1440 |

## Limitations

Each frame is an `<iframe>`, so pages that forbid embedding won't render. Many public sites block it with an `X-Frame-Options` header or a `frame-ancestors` Content Security Policy. Your own dev server and local files usually allow it.

## How it works

- `bin/cli.js`: parses the arguments and decides whether a file server is needed.
- `src/server.js`: an Express server for the grid, plus a second one on port + 1 when you pass a folder.
- `src/template.js`: the grid itself, one scaled iframe per device size.

## License

GPL-3.0. See [LICENSE](LICENSE).
