const express = require('express');
const open = require('open');
const { getPreviewHTML } = require('./template');

async function startServer(targetDir, targetURL, port, shouldOpen) {
  const app = express();

  // Determine if we're in URL mode or directory mode
  const isURLMode = targetURL !== null;

  // Serve the preview interface at root
  app.get('/', (req, res) => {
    res.send(getPreviewHTML(isURLMode, targetURL));
  });

  // Only serve static files if we're in directory mode
  if (!isURLMode) {
    app.use('/site', express.static(targetDir));
  }

  // Start the server
  return new Promise((resolve, reject) => {
    const server = app.listen(port, async (err) => {
      if (err) {
        reject(err);
        return;
      }

      const url = `http://localhost:${port}`;
      console.log(`\nUIGrid is running at: ${url}`);
      console.log(`\nPress Ctrl+C to stop the server\n`);

      if (shouldOpen) {
        try {
          await open(url);
        } catch (error) {
          console.log('Could not open browser automatically. Please visit the URL manually.');
        }
      }

      resolve(server);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        reject(new Error(`Port ${port} is already in use. Try a different port with -p flag.`));
      } else {
        reject(err);
      }
    });
  });
}

module.exports = { startServer };