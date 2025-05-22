import db from "../../../../../db/connection";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        product_name,
        description,
        price,
        dimension_data,
        photo_url,
        category_id,
        stock_quantity
      FROM Products
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}
