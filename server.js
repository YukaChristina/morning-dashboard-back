import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import marketsRouter from './routes/markets.js';
import newsRouter from './routes/news.js';
import calendarRouter from './routes/calendar.js';

dotenv.config();
const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());

app.use('/api/markets', marketsRouter);
app.use('/api/news', newsRouter);
app.use('/api/calendar', calendarRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
