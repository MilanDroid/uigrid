#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const { startServer } = require('../src/server');

program
  .name('uigrid')
  .description('Preview websites on different screen sizes')
  .argument('[directory]', 'Optional directory to serve via localhost')
  .option('-p, --port <port>', 'Port to run the UIGrid preview on', '3000')
  .option('-n, --no-open', 'Do not open browser automatically')
  .action(async (directory, options) => {
    const port = parseInt(options.port, 10);
    const shouldOpen = options.open;

    console.log(`Starting UIGrid...`);

    let targetDir = null;
    if (directory) {
      targetDir = path.resolve(process.cwd(), directory);
    }

    try {
      await startServer(targetDir, port, shouldOpen);
    } catch (error) {
      console.error('Error starting server:', error.message);
      process.exit(1);
    }
  });

program.parse();