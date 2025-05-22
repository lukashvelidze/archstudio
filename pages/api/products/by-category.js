const db = require("../../../db/connection");

export default async function handler(req, res) {
  const { categoryId } = req.query;

  if (!categoryId) {
    return res.status(400).json({ error: "Missing categoryId" });
  }

  try {
    const [rows] = await db.query(
      `SELECT 
         id,
         product_name,
         description,
         price,
         dimension_data,
         photo_url,
         category_id,
         CASE 
           WHEN stock_quantity > 0 THEN 'In Stock' 
           ELSE 'Out of Stock' 
         END AS stock_status
       FROM Products
       WHERE category_id = ?`,
      [categoryId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
