import Link from "next/link";
import "./productPage.css"; // ✅ make sure this is imported

export default async function ProductPage() {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div>კატეგორიების ჩატვირთვა ვერ მოხერხდა</div>;
  }

  const categories = await res.json();

  return (
    <div className="productMainDiv">
      <div>
        <h1 className="text-4xl font-extrabold text-center text-red-700 mb-12 drop-shadow-md">
          პროდუქციის კატეგორიები
        </h1>

        <div className="routesDiv">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/product/category/${cat.id}`}>
              <div className="routes">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
