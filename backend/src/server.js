import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
import servicesRouter from './routes/services.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';
import { initializeDatabase } from './db/init.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Servir les fichiers statiques (images uploadées)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);

// Basic error handler to log server errors in console and return JSON
// Keep this after routes so it catches thrown errors
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err?.message || 'Unknown error' });
});

const port = Number(process.env.PORT || 3000);

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });


