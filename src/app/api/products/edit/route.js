import db from "../../../../../db/connection";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, product_name, description, price, stock_quantity, dimension_data, photo_url, category_id } = body;

    await db.query(
      `UPDATE Products
       SET product_name = ?, description = ?, price = ?, stock_quantity = ?, dimension_data = ?, photo_url = ?, category_id = ?
       WHERE id = ?`,
      [product_name, description, price, stock_quantity, dimension_data, photo_url, category_id, id]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Edit error:", err);
    return new Response(JSON.stringify({ error: "Failed to update product" }), { status: 500 });
  }
}
