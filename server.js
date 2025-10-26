// src/components/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// allow react frontend to fetch from backend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// serve static files (gesture_data.json included)
app.use(express.static(__dirname));

// serve gesture_data.json directly
app.get('/gesture_data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'gesture_data.json'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
