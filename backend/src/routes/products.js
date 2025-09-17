import { Router } from 'express';
import { getPool } from '../db/mysql.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('GET /api/products error:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [Number(req.params.id)]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('GET /api/products/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

router.post('/', async (req, res) => {
  const p = req.body;
  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `INSERT INTO products (name, description, price, category, image, features, specifications, inStock, rating, reviews)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.name,
        p.description || '',
        p.price,
        p.category,
        p.image || '',
        JSON.stringify(p.features || []),
        JSON.stringify(p.specifications || {}),
        Boolean(p.inStock) ? 1 : 0,
        p.rating || 0,
        p.reviews || 0
      ]
    );
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('POST /api/products error:', err);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const p = req.body;
  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `UPDATE products SET
         name = ?, description = ?, price = ?, category = ?,
         image = ?, features = ?, specifications = ?,
         inStock = ?, rating = ?, reviews = ?
       WHERE id = ?`,
      [
        p.name,
        p.description || '',
        p.price,
        p.category,
        p.image || '',
        JSON.stringify(p.features || []),
        JSON.stringify(p.specifications || {}),
        Boolean(p.inStock) ? 1 : 0,
        p.rating || 0,
        p.reviews || 0,
        id
      ]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('PUT /api/products/:id error:', err);
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('DELETE /api/products/:id error:', err);
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

export default router;


