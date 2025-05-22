const db = require('../../db/connection');

export default async function handler(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM Categories');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to load categories' });
  }
}
