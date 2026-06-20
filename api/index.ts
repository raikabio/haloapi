// api/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { mediaCatalog } from './data.js';

const app = express();

app.use(cors());
app.use(express.json());

// Base Status Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to your Vercel-ready TypeScript Media API!' });
});

// GET all trailers and media items
app.get('/api/media', (req: Request, res: Response) => {
  res.json(mediaCatalog);
});

// GET a single media item by its specific ID
app.get('/api/media/:id', (req: Request, res: Response) => {
  const item = mediaCatalog.find(m => m.id === req.params.id);
  
  if (!item) {
    res.status(404).json({ error: "Media profile not found" });
    return;
  }
  
  res.json(item);
});

// For local dev runtime
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local TS dev running on port ${PORT}`));
}

export default app;