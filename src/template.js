function getPreviewHTML(isURLMode = false, targetURL = '') {
  const defaultPath = isURLMode ? targetURL : '/index.html';
  const inputLabel = isURLMode ? 'URL:' : 'URL Path:';
  const inputPlaceholder = isURLMode ? 'http://localhost' : '/index.html';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UIGrid - Responsive Preview</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }

    .header {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header h1 {
      font-size: 24px;
      color: #333;
      margin-bottom: 8px;
    }

    .header p {
      color: #666;
      font-size: 14px;
    }

    .controls {
      background: white;
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      gap: 15px;
      align-items: center;
      flex-wrap: wrap;
    }

    .controls label {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }

    .controls input {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      flex: 1;
      max-width: 400px;
    }

    .controls button {
      padding: 8px 16px;
      background: #007aff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      font-weight: 500;
    }

    .controls button:hover {
      background: #0051d5;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .viewport {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }

    .viewport-header {
      padding: 12px 16px;
      background: #333;
      color: white;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .viewport-header .device-name {
      font-weight: 600;
    }

    .viewport-header .dimensions {
      color: #aaa;
      font-size: 12px;
    }

    .viewport-content {
      position: relative;
      background: #fff;
      overflow: hidden;
    }

    .viewport-frame {
      border: none;
      display: block;
      background: white;
      transform-origin: top left;
    }

    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>UIGrid - Responsive Preview</h1>
    <p>Preview your website across multiple screen sizes simultaneously</p>
  </div>

  <div class="controls">
    <label for="urlInput">${inputLabel}</label>
    <input
      type="text"
      id="urlInput"
      placeholder="${inputPlaceholder}"
      value="${defaultPath}"
    >
    <button onclick="updateAllFrames()">Load</button>
  </div>

  <div class="grid" id="viewportGrid"></div>

  <script>
    const IS_URL_MODE = ${isURLMode};

    const devices = [
      { name: 'iPhone SE', width: 375, height: 667, scale: 1 },
      { name: 'iPhone 14 Pro', width: 393, height: 852, scale: 1 },
      { name: 'iPad Mini', width: 768, height: 1024, scale: 0.6 },
      { name: 'iPad Pro', width: 1024, height: 1366, scale: 0.5 },
      { name: 'Desktop HD', width: 1920, height: 1080, scale: 0.4 },
      { name: 'Desktop 4K', width: 2560, height: 1440, scale: 0.3 }
    ];

    function createViewport(device) {
      const displayHeight = device.height * device.scale;

      return \`
        <div class="viewport">
          <div class="viewport-header">
            <span class="device-name">\${device.name}</span>
            <span class="dimensions">\${device.width} × \${device.height}</span>
          </div>
          <div class="viewport-content" style="height: \${displayHeight}px; width: 100%;">
            <div class="loading">Loading...</div>
            <iframe
              class="viewport-frame"
              data-device="\${device.name}"
              style="width: \${device.width}px; height: \${device.height}px; transform: scale(\${device.scale});"
            ></iframe>
          </div>
        </div>
      \`;
    }

    function initializeViewports() {
      const grid = document.getElementById('viewportGrid');
      grid.innerHTML = devices.map(device => createViewport(device)).join('');
      updateAllFrames();
    }

    function isURL(str) {
      try {
        new URL(str);
        return str.startsWith('http://') || str.startsWith('https://');
      } catch {
        return false;
      }
    }

    function updateAllFrames() {
      const urlInput = document.getElementById('urlInput');
      let urlValue = urlInput.value.trim();

      if (!urlValue) {
        return;
      }

      const frames = document.querySelectorAll('.viewport-frame');

      if (IS_URL_MODE) {
        // In URL mode, use the value directly if it's a URL, or append to base URL
        if (isURL(urlValue)) {
          frames.forEach(frame => {
            frame.src = urlValue;
          });
        } else {
          // Try to append as a path
          try {
            const baseURL = document.getElementById('urlInput').placeholder || '${targetURL}';
            const url = new URL(urlValue, baseURL);
            frames.forEach(frame => {
              frame.src = url.href;
            });
          } catch {
            frames.forEach(frame => {
              frame.src = urlValue;
            });
          }
        }
      } else {
        // In directory mode, prefix with /site
        let urlPath = urlValue;
        if (!urlPath.startsWith('/')) {
          urlPath = '/' + urlPath;
        }
        frames.forEach(frame => {
          frame.src = '/site' + urlPath;
        });
      }
    }

    // Allow Enter key to load
    document.getElementById('urlInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        updateAllFrames();
      }
    });

    // Initialize on load
    initializeViewports();
  </script>
</body>
</html>
  `;
}

module.exports = { getPreviewHTML };