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
    <div className="main_div">
      <div>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md mb-12">
          პროდუქციის კატეგორიები
        </h1>
        <div className="list_div">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/product/category/${cat.id}`}>
              <div className="list_product">{cat.name}</div>
            </Link>

          ))}
        </div>
      </div>
    </div>
  );
}