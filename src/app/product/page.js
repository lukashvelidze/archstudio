import Link from "next/link";

export default async function ProductPage() {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error("Failed to fetch categories");
    return <div>კატეგორიების ჩატვირთვა ვერ მოხერხდა</div>;
  }

  const categories = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        პროდუქციის კატეგორიები
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{cat.name}</h2>
            <Link href={`/product/category/${cat.id}`}>
              <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                ნახვა
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
