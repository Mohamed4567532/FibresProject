import { Router } from 'express';
import { getPool } from '../db/mysql.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM services ORDER BY id');
    
    // Parser les features JSON
    const services = rows.map(service => ({
      ...service,
      features: service.features ? (typeof service.features === 'string' ? JSON.parse(service.features) : service.features) : []
    }));
    
    res.json(services);
  } catch (err) {
    console.error('GET /api/services error:', err);
    res.status(500).json({ error: 'Failed to fetch services', details: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [Number(req.params.id)]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    
    const service = rows[0];
    service.features = service.features ? (typeof service.features === 'string' ? JSON.parse(service.features) : service.features) : [];
    
    res.json(service);
  } catch (err) {
    console.error('GET /api/services/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch service', details: err.message });
  }
});

router.post('/', async (req, res) => {
  const s = req.body;
  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `INSERT INTO services (title, description, icon, features, price, duration, category)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        s.title,
        s.description || '',
        s.icon || 'fiber_optics',
        JSON.stringify(s.features || []),
        s.price || null,
        s.duration || null,
        s.category
      ]
    );
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [result.insertId]);
    const service = rows[0];
    service.features = service.features ? (typeof service.features === 'string' ? JSON.parse(service.features) : service.features) : [];
    res.status(201).json(service);
  } catch (err) {
    console.error('POST /api/services error:', err);
    res.status(500).json({ error: 'Failed to create service', details: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const s = req.body;
  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `UPDATE services SET
         title = ?, description = ?, icon = ?,
         features = ?, price = ?, duration = ?, category = ?
       WHERE id = ?`,
      [
        s.title,
        s.description || '',
        s.icon || 'fiber_optics',
        JSON.stringify(s.features || []),
        s.price || null,
        s.duration || null,
        s.category,
        id
      ]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    const service = rows[0];
    service.features = service.features ? (typeof service.features === 'string' ? JSON.parse(service.features) : service.features) : [];
    res.json(service);
  } catch (err) {
    console.error('PUT /api/services/:id error:', err);
    res.status(500).json({ error: 'Failed to update service', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    await pool.query('DELETE FROM services WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('DELETE /api/services/:id error:', err);
    res.status(500).json({ error: 'Failed to delete service', details: err.message });
  }
});

export default router;

