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
      <div>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md mb-12">
          დეტექციის პროდუქცია
        </h1>
        <div className="list_div">
          {products.map((product) => (
            <div key={product.id} className="list_product" style={{ flexDirection: "column" }}>
              <div className="text-lg font-bold mb-2">{product.product_name}</div>
              <div className="text-sm">{product.description}</div>
              <div className="text-sm mt-1">💰 {product.price}₾</div>
              <div className="text-xs mt-1">{product.stock_status}</div>
              <div className="text-xs italic">{product.dimension_data}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
