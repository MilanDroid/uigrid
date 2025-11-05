const express = require('express');
const open = require('open');
const { getPreviewHTML } = require('./template');

async function startServer(targetDir, port, shouldOpen) {
  const previewApp = express();
  let fileServerPort = null;
  let defaultURL = '';

  // If a directory is provided, start a file server for it
  if (targetDir) {
    fileServerPort = port + 1;
    const fileApp = express();
    fileApp.use(express.static(targetDir));

    await new Promise((resolve, reject) => {
      const fileServer = fileApp.listen(fileServerPort, (err) => {
        if (err) {
          if (err.code === 'EADDRINUSE') {
            reject(new Error(`Port ${fileServerPort} is already in use. The file server needs port ${fileServerPort}.`));
          } else {
            reject(err);
          }
          return;
        }
        console.log(`File server running at: http://localhost:${fileServerPort}`);
        console.log(`Serving: ${targetDir}`);
        resolve(fileServer);
      });

      fileServer.on('error', reject);
    });

    defaultURL = `http://localhost:${fileServerPort}`;
  }

  // Serve the preview interface at root
  previewApp.get('/', (req, res) => {
    res.send(getPreviewHTML(defaultURL));
  });

  // Start the preview server
  return new Promise((resolve, reject) => {
    const server = previewApp.listen(port, async (err) => {
      if (err) {
        reject(err);
        return;
      }

      const url = `http://localhost:${port}`;
      console.log(`\nUIGrid preview running at: ${url}`);
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