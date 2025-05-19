import db from "../../../../../db/connection";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, product_name, price, stock_status, dimension_data } = body;

    await db.query(
      `UPDATE Products SET product_name = ?, price = ?, stock_status = ?, dimension_data = ? WHERE id = ?`,
      [product_name, price, stock_status, dimension_data, id]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Edit error:", err);
    return new Response(JSON.stringify({ error: "Failed to edit product" }), { status: 500 });
  }
}
