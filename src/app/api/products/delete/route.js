import db from "../../../../../db/connection";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await db.query(`DELETE FROM Products WHERE id = ?`, [id]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Delete error:", err);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}
