// api/server.js
import express from 'express';
import cors from 'cors';
import { userProfile } from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

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

// FIX: Only call app.listen if we are NOT running on Vercel's platform
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Local dev running on port ${PORT}`);
  });
}

// Export the app instance so Vercel can invoke it as a serverless function
export default app;