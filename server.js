import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/factcheck', createProxyMiddleware({
  target: 'https://fact-checking-assistant.onrender.com', // Actual fact-checking API
  changeOrigin: true,
  secure: false,
}));

