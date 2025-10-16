#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Run vite directly
const vitePath = path.join(__dirname, 'node_modules', '.bin', 'vite');
const vite = spawn(vitePath, ['--host', '--port', '5173'], {
  stdio: 'inherit',
  shell: true
});

vite.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
});

vite.on('error', (err) => {
  console.error('Failed to start vite:', err);
});
