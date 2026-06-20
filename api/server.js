// api/server.js
import express from 'express';
import cors from 'cors';
import { userProfile } from './data.js'; // Points to the new local data file

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

// Start server for local development
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Export default app for Vercel
export default app;