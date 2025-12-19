const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy all requests to the local port on the Mac via reverse SSH
const target = 'http://localhost:6080'; // Mac side of reverse tunnel

app.use('/', createProxyMiddleware({
  target,
  changeOrigin: true,
  ws: true, // allow WebSocket for noVNC
  logLevel: 'info'
}));

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
