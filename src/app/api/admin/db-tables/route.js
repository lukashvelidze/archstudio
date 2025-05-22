import db from "../../../../../db/connection"; // ✅ correct relative path to your db

export async function GET() {
  try {
    const [tables] = await db.query("SHOW TABLES");
    const tableNames = tables.map(row => Object.values(row)[0]);

    const result = {};
    for (const name of tableNames) {
      const [rows] = await db.query(`SELECT * FROM ${name}`);
      result[name] = rows;
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to load tables:", err);
    return new Response(JSON.stringify({ error: "Failed to load tables" }), { status: 500 });
  }
}
