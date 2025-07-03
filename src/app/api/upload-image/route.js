export const runtime = "nodejs";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    if (typeof file.arrayBuffer !== "function") {
      return new Response(
        JSON.stringify({ error: "Invalid file object" }),
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (err, result) => {
          if (err) {
            console.error("Cloudinary error:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });

    return new Response(JSON.stringify({ url: uploaded.secure_url }), {
      status: 200,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(
      JSON.stringify({ error: "Upload failed", message: err?.message }),
      { status: 500 }
    );
  }
}
