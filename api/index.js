import express from 'express';
import cors from 'cors';
import { userProfile } from './data.js';

const app = express();

app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to your Vercel-ready API!' });
});

// User Profile Route
app.get('/api/user', (req, res) => {
  res.json(userProfile);
});

// For local dev via "pnpm dev"
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local dev on port ${PORT}`));
}

// Crucial: Vercel hooks into this export natively
export default app;