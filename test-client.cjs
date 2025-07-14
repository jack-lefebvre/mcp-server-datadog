const { spawn } = require('child_process');

const mcp = spawn('node', ['./build/index.js']);

const payload = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "get_monitors",
    arguments: {}
  }
};

// Wait a moment for the server to fully initialize before sending payload
setTimeout(() => {
  mcp.stdin.write(JSON.stringify(payload) + "\n");
}, 100); // 100ms

mcp.stdout.on('data', (data) => {
  console.log('STDOUT:', data.toString());
});

mcp.stderr.on('data', (data) => {
  console.error('STDERR:', data.toString());
});

mcp.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
