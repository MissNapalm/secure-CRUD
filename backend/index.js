import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;
import { body, validationResult } from 'express-validator';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.disable('x-powered-by');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_db',
  password: 'postgres',
  port: 5432,
});

// CREATE
app.post('/items',
  body('name').trim().escape().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO items(name) VALUES($1) RETURNING *',
      [name]
    );
    res.json(result.rows[0]);
  }
);

// READ
app.get('/items', async (req, res) => {
  const result = await pool.query('SELECT * FROM items');
  res.json(result.rows);
});

// UPDATE
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await pool.query(
    'UPDATE items SET name=$1 WHERE id=$2 RETURNING *',
    [name, id]
  );
  res.json(result.rows[0]);
});

// DELETE
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM items WHERE id=$1', [id]);
  res.sendStatus(204);
});

app.listen(3002, () => {
  console.log('Backend running on http://localhost:3002');
});
// Error logging middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});