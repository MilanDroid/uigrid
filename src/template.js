function getPreviewHTML(defaultURL = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UIGrid - Responsive Preview</title>
  <style>
    :root {
      --bg-primary: #f5f5f5;
      --bg-secondary: #ffffff;
      --bg-header: #333333;
      --text-primary: #333333;
      --text-secondary: #666666;
      --text-tertiary: #333333;
      --text-light: #aaaaaa;
      --border-color: #dddddd;
      --shadow: rgba(0,0,0,0.1);
      --shadow-lg: rgba(0,0,0,0.1);
    }

    body.dark-mode {
      --bg-primary: #1a1a1a;
      --bg-secondary: #2d2d2d;
      --bg-header: #1f1f1f;
      --text-primary: #e0e0e0;
      --text-secondary: #b0b0b0;
      --text-tertiary: #808080;
      --text-light: #606060;
      --border-color: #404040;
      --shadow: rgba(0,0,0,0.3);
      --shadow-lg: rgba(0,0,0,0.5);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: var(--bg-primary);
      padding: 20px;
      transition: background-color 0.3s ease;
    }

    .dark-mode-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-secondary);
      padding: 8px 12px;
      border-radius: 20px;
      box-shadow: 0 2px 8px var(--shadow-lg);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .dark-mode-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--shadow-lg);
    }

    .toggle-switch {
      position: relative;
      width: 44px;
      height: 24px;
      background: var(--border-color);
      border-radius: 12px;
      transition: background-color 0.3s ease;
    }

    .toggle-slider {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform 0.3s ease;
      box-shadow: 0 2px 4px var(--shadow);
    }

    .dark-mode .toggle-switch {
      background: #007aff;
    }

    .dark-mode .toggle-slider {
      transform: translateX(20px);
    }

    .toggle-icon {
      font-size: 16px;
    }

    .header {
      background: var(--bg-secondary);
      border-radius: 8px;
      box-shadow: 0 2px 4px var(--shadow);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      margin-bottom: 1rem;
    }

    .header h1 {
      font-size: 24px;
      color: var(--text-primary);
    }

    .header p {
      color: var(--text-secondary);
      font-size: 14px;
      margin: 0;
    }

    .controls {
      display: flex;
      gap: 15px;
      align-items: center;
      flex-wrap: wrap;
      transition: all 0.3s ease;
    }

    .controls label {
      font-size: 14px;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .controls input {
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 14px;
      flex: 1;
      width: 50vw;
      max-width: 500px;
      background: var(--bg-primary);
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    .controls input:focus {
      outline: none;
      border-color: #007aff;
    }

    .grid {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(auto-fill, minmax(30vw,1fr));
      grid-auto-rows: 20px;
      margin-bottom: 20px;
    }

    .viewport {
      background: var(--bg-secondary);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px var(--shadow-lg);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .viewport-header {
      padding: 12px 16px;
      background: var(--bg-header);
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
      color: var(--text-light);
      font-size: 12px;
    }

    .viewport-content {
      position: relative;
      background: var(--bg-secondary);
      overflow: hidden;
    }

    .viewport-frame {
      border: none;
      display: block;
      background: var(--bg-secondary);
      transform-origin: top left;
    }

    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-tertiary);
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
    <h1>UIGrid</h1>
    
    <div class="controls">
        <input
            type="text"
            id="urlInput"
            placeholder="http://localhost:3000"
            value="${defaultURL}"
            onchange="updateAllFrames()"
        >
    </div>
    
    <div class="dark-mode-toggle" onclick="toggleDarkMode()">
        <span class="toggle-icon" id="themeIcon">☀️</span>
        <div class="toggle-switch">
            <div class="toggle-slider"></div>
        </div>
    </div>
  </div>

  <div class="grid" id="viewportGrid">
    <div class="viewport"></div>
    <div class="viewport"></div>
    <div class="viewport"></div>
    <div class="viewport"></div>
</div>

  <script>
    const devices = [
      { name: 'Desktop 4K', width: 2560, height: 1440 },
      { name: 'Desktop HD', width: 1920, height: 1080 },
      { name: 'Desktop', width: 1366, height: 720 },
      { name: 'Nethub', width: 1024, height: 600 },
      { name: 'iPad Pro', width: 1024, height: 1366 },
      { name: 'iPad Mini', width: 768, height: 1024 },
      { name: 'iPhone 14 Pro', width: 393, height: 852 },
      { name: 'iPhone SE', width: 375, height: 667 },
    ];
    
    function resizeGridItem(item){
      const grid = document.getElementsByClassName("grid")[0];
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil((item.querySelector('iframe').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
    }
    
    function resizeAllGridItems(){
      const allItems = document.getElementsByClassName("viewport");
      for(let x=0;x<allItems.length;x++){
        resizeGridItem(allItems[x]);
      }
    }

    function createViewport(device) {
      const containerWidth = document.getElementById('viewportGrid').children[0].offsetWidth;
      const aspectRatio = device.width / device.height;
      const displayHeight = containerWidth / aspectRatio;
      const scale = displayHeight / device.height;

      return \`
        <div class="viewport">
          <div class="viewport-header">
            <span class="device-name">\${device.name}</span>
            <span class="dimensions">\${device.width} × \${device.height}</span>
          </div>
          <div class="viewport-content" style="height: \${displayHeight}px; width: \${containerWidth}px;">
            <iframe
              class="viewport-frame"
              data-device="\${device.name}"
              style="width: \${device.width}px; height: \${device.height}px; transform: scale(\${scale});"
            ></iframe>
          </div>
        </div>
      \`;
    }

    function initializeViewports() {
      const grid = document.getElementById('viewportGrid');
      grid.innerHTML = devices.map(device => createViewport(device)).join('');
      resizeAllGridItems();
      window.addEventListener("resize", () => {
        grid.innerHTML = devices.map(device => createViewport(device)).join('');
        resizeAllGridItems();
        updateAllFrames();
      });

      // Load default URL if provided
      const urlInput = document.getElementById('urlInput');
      if (urlInput.value.trim()) {
        updateAllFrames();
      }
    }

    function updateAllFrames() {
      const urlInput = document.getElementById('urlInput');
      const url = urlInput.value.trim();

      if (!url) {
        return;
      }

      const frames = document.querySelectorAll('.viewport-frame');
      frames.forEach(frame => {
        frame.src = url;
      });
    }

    // Dark mode functionality
    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');

      // Update icon
      document.getElementById('themeIcon').textContent = isDarkMode ? '🌙' : '☀️';

      // Save preference
      localStorage.setItem('darkMode', isDarkMode.toString());
    }

    // Load dark mode preference on page load
    function initializeDarkMode() {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true' || !savedDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon').textContent = '🌙';
      }
    }

    // Allow Enter key to load
    document.getElementById('urlInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        updateAllFrames();
      }
    });

    // Initialize on load
    initializeDarkMode();
    initializeViewports();
  </script>
</body>
</html>
  `;
}

module.exports = { getPreviewHTML };