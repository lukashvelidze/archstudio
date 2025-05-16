// pages/api/products/by-category.js
const db = require('../../../db/connection'); // adjust if needed

export default async function handler(req, res) {
  const { categoryId } = req.query;

  if (!categoryId) {
    return res.status(400).json({ error: "Missing categoryId" });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM Products WHERE category_id = ?',
      [categoryId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
