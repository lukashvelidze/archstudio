import db from "../../../../../db/connection";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      product_name,
      description,
      price,
      dimension_data,
      stock_quantity,
      category_id,
      photo_url, // ✅ Add this
    } = body;

    await db.query(
      `INSERT INTO Products (
        product_name,
        description,
        price,
        dimension_data,
        stock_quantity,
        category_id,
        photo_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        product_name,
        description,
        price,
        dimension_data,
        stock_quantity,
        category_id,
        photo_url, // ✅ Include this
      ]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Add error:", err);
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
    });
  }
}
