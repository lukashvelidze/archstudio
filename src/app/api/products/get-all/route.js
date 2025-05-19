import db from "../../../../../db/connection";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM Products");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}
