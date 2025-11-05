#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const { startServer } = require('../src/server');

function isURL(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

program
  .name('uigrid')
  .description('Preview websites on different screen sizes')
  .argument('[target]', 'Directory to serve or URL to preview (defaults to current directory)', '.')
  .option('-p, --port <port>', 'Port to run the server on', '3000')
  .option('-n, --no-open', 'Do not open browser automatically')
  .action(async (target, options) => {
    const port = parseInt(options.port, 10);
    const shouldOpen = options.open;

    console.log(`Starting UIGrid server...`);

    let targetURL = null;
    let targetDir = null;

    if (isURL(target)) {
      targetURL = target;
      console.log(`Preview URL: ${targetURL}`);
    } else {
      targetDir = path.resolve(process.cwd(), target);
      console.log(`Serving: ${targetDir}`);
    }

    console.log(`Port: ${port}`);

    try {
      await startServer(targetDir, targetURL, port, shouldOpen);
    } catch (error) {
      console.error('Error starting server:', error.message);
      process.exit(1);
    }
  });

program.parse();