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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        პროდუქციის კატეგორიები
      </h1>

      {/* Horizontal scrolling container */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="min-w-[250px] bg-red-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-red-700 transition-all duration-200 p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">{cat.name}</h2>
            <Link href={`/product/category/${cat.id}`}>
              <button className="mt-auto bg-white text-red-600 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                ნახვა
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
