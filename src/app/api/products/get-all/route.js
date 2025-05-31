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

    // Add stock_status based on stock_quantity
    const products = rows.map(product => ({
      ...product,
      stock_status: product.stock_quantity > 0 ? "მაჩვენებელია" : "ამოიწურა"
    }));

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}
