// ✅ /app/product/category/[id]/page.js
import "../../productPage.css";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/products/by-category?categoryId=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const products = await res.json();

  return (
    <div className="main_div">
      <div className="content_wrapper">
        <h1 className="page_title">პროდუქცია</h1>
        <div className="list_div">
          {products.map((product) => (
            <div key={product.id} className="product_card">
              {product.photo_url && (
                <img
                  src={product.photo_url}
                  alt={product.product_name}
                  className="product-image"
                />
              )}
              <div className="text-lg font-bold">{product.product_name}</div>
              <div className="text-sm text-gray-700" style={{ whiteSpace: "pre-line" }}>
                {product.description}
              </div>

              <div className="price">ფასი: {product.price}₾</div>
              <div className="text-sm">ზომები: {product.dimension_data}</div>
              <div
                className={`stock ${
                  product.stock_status === "In Stock" ? "in-stock" : "out-of-stock"
                }`}
              >
                სტატუსი: {product.stock_status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}