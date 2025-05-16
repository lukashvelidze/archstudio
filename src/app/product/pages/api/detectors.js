// pages/api/detectors.js

const db = require('../../db');

export default async function handler(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM Detectors'); // make sure this table exists
    res.status(200).json(rows);
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ message: 'Error fetching detectors data' });
  }
}

