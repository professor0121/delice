import http from 'http';
import { PORT } from './src/config/env.config.js';
import app from './src/app.js';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});