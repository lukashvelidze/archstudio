// /app/product/page.js
import Link from "next/link";
import "./productPage.css";

export default async function ProductPage() {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>კატეგორიების ჩატვირთვა ვერ მოხერხდა</div>;
  }

  const categories = await res.json();

  return (
    <div className="category_bg">
      <div>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md mb-12">
          პროდუქციის კატეგორიები
        </h1>

        <div className="category_div">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/product/category/${cat.id}`}>
              <div className="category_card">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
