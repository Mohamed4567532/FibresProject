import { Router } from 'express';
import { getPool, sql } from '../db/mssql.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Products ORDER BY id');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('id', sql.Int, Number(req.params.id))
      .query('SELECT * FROM Products WHERE id = @id');
    if (result.recordset.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

router.post('/', async (req, res) => {
  const p = req.body;
  try {
    const pool = await getPool();
    const insert = await pool
      .request()
      .input('name', sql.NVarChar(255), p.name)
      .input('description', sql.NVarChar(sql.MAX), p.description || '')
      .input('price', sql.Decimal(18, 2), p.price)
      .input('category', sql.NVarChar(100), p.category)
      .input('image', sql.NVarChar(500), p.image || '')
      .input('features', sql.NVarChar(sql.MAX), JSON.stringify(p.features || []))
      .input('specifications', sql.NVarChar(sql.MAX), JSON.stringify(p.specifications || {}))
      .input('inStock', sql.Bit, Boolean(p.inStock))
      .input('rating', sql.Float, p.rating || 0)
      .input('reviews', sql.Int, p.reviews || 0)
      .query(
        `INSERT INTO Products (name, description, price, category, image, features, specifications, inStock, rating, reviews)
         OUTPUT inserted.*
         VALUES (@name, @description, @price, @category, @image, @features, @specifications, @inStock, @rating, @reviews)`
      );
    res.status(201).json(insert.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const p = req.body;
  try {
    const pool = await getPool();
    const update = await pool
      .request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar(255), p.name)
      .input('description', sql.NVarChar(sql.MAX), p.description || '')
      .input('price', sql.Decimal(18, 2), p.price)
      .input('category', sql.NVarChar(100), p.category)
      .input('image', sql.NVarChar(500), p.image || '')
      .input('features', sql.NVarChar(sql.MAX), JSON.stringify(p.features || []))
      .input('specifications', sql.NVarChar(sql.MAX), JSON.stringify(p.specifications || {}))
      .input('inStock', sql.Bit, Boolean(p.inStock))
      .input('rating', sql.Float, p.rating || 0)
      .input('reviews', sql.Int, p.reviews || 0)
      .query(
        `UPDATE Products SET
           name=@name, description=@description, price=@price, category=@category,
           image=@image, features=@features, specifications=@specifications,
           inStock=@inStock, rating=@rating, reviews=@reviews
         OUTPUT inserted.*
         WHERE id=@id`
      );
    if (update.recordset.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(update.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('id', sql.Int, Number(req.params.id))
      .query('DELETE FROM Products OUTPUT deleted.* WHERE id=@id');
    if (result.recordset.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

export default router;


