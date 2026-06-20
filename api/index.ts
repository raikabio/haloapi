import express, { Request, Response } from 'express';
import cors from 'cors';
import { userProfile } from './data.js'; // Keep the .js extension here!

const app = express();

app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to your Vercel-ready TypeScript API!' });
});

// User Profile Route
app.get('/api/user', (req: Request, res: Response) => {
  res.json(userProfile);
});

// For local dev
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local TS dev on port ${PORT}`));
}

export default app;