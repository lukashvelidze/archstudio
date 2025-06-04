'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "./admin.css";


export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [ready, setReady] = useState(false);

  const [products, setProducts] = useState([]);
  const [tables, setTables] = useState({});
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    dimension_data: "",
    stock_quantity: 0,
    category_id: 1,
    photo_url: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("All");

  // Login check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setAuthorized(true);
    } else {
      router.replace('/login');
    }
    setReady(true);
  }, [router]);

  // Load data only if authorized
  useEffect(() => {
    if (!authorized) return;
    refreshProducts();
    fetch("/api/admin/db-tables")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, [authorized]);

  if (!ready || !authorized) return null;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: uploadForm,
    });

    const data = await res.json();

    if (data.url) {
      setFormData((prev) => ({ ...prev, photo_url: data.url }));
      setImagePreview(data.url);
    } else {
      alert("Upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    refreshProducts();
    setFormData({
      product_name: "",
      description: "",
      price: "",
      dimension_data: "",
      stock_quantity: 0,
      category_id: 1,
      photo_url: "",
    });
    setImagePreview(null);
  };

  const refreshProducts = async () => {
    const res = await fetch("/api/products/get-all");
    const data = await res.json();
    setProducts(data);
  };

  const startEdit = (product) => {
    setEditingProductId(product.id);
    setEditData({ ...product });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    const { stock_quantity_input, ...cleanedData } = editData;

    await fetch("/api/products/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData),
    });

    setEditingProductId(null);
    setEditData({});
    refreshProducts();
  };

  const deleteProduct = async (id) => {
    await fetch("/api/products/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refreshProducts();
  };

  const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  setAuthorized(false);
  router.replace('/login');
};


  const grouped = products.reduce((acc, product) => {
    const key = product.category_id;
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && product.stock_quantity > 0) ||
      (stockFilter === "Out of Stock" && product.stock_quantity === 0);
    if (!matchesSearch || !matchesStock) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});

  const categoryMap = {};
  (tables.Categories || []).forEach((cat) => {
    categoryMap[cat.id] = cat.name;
  });

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <h1 className="admin-title">ინვენტარის ბაზა</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button onClick={handleLogout} className="logoutButton">
            Log Out
          </button>
        </div>

        <div className="admin-filters">
          <input
            type="text"
            placeholder="Search by name or description"
            className="inputStyle"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="inputStyle"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="All">All Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <section className="dashboard-section">
          <h2 className="section-title">დამატება</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <input name="product_name" placeholder="დასახელება" value={formData.product_name} onChange={handleInput} className="inputStyle" required />
            <textarea name="description" placeholder="აღწერა" value={formData.description} onChange={handleInput} className="inputStyle" rows={4} />
            <input name="price" type="number" placeholder="ფასი" value={formData.price} onChange={handleInput} className="inputStyle" />
            <input name="dimension_data" placeholder="ზომა / წონა" value={formData.dimension_data} onChange={handleInput} className="inputStyle" />
            <input name="stock_quantity" type="number" placeholder="მარაგში" min="0" value={formData.stock_quantity} onChange={handleInput} className="inputStyle" />
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="inputStyle" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ marginTop: "10px", maxWidth: "100%", borderRadius: "10px", boxShadow: "0 0 6px rgba(0,0,0,0.1)" }} />
            )}
            <select name="category_id" value={formData.category_id} onChange={handleInput} className="inputStyle">
              {(tables.Categories || []).map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name} (ID: {cat.id})</option>
              ))}
            </select>
            <button type="submit" className="submitButton" disabled={!formData.photo_url} style={{ opacity: formData.photo_url ? 1 : 0.5, cursor: formData.photo_url ? "pointer" : "not-allowed" }}>
              {formData.photo_url ? "Add Product" : "Upload Image First"}
            </button>
          </form>
        </section>
        <section className="dashboard-section">
          <h2 className="section-title">ყველა</h2>
          {Object.entries(grouped).map(([categoryId, items]) => (
            <div key={categoryId} className="admin-table-card">
              <h3 className="table-title">{categoryMap[categoryId] || `Category ID: ${categoryId}`}</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>სურათი</th>
                    <th>დასახელება</th>
                    <th>ფასი</th>
                    <th>მარაგი</th>
                    <th>ზომა / წონა</th>
                    <th>აღწერა</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((product) =>
                    editingProductId === product.id ? (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td><input value={editData.photo_url} onChange={(e) => setEditData({ ...editData, photo_url: e.target.value })} placeholder="Image URL" /></td>
                        <td><input value={editData.product_name} onChange={(e) => setEditData({ ...editData, product_name: e.target.value })} /></td>
                        <td><input value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} /></td>
                        <td>
                          <input
                            type="text"
                            placeholder="e.g. +5, -2, 10"
                            value={editData.stock_quantity_input ?? editData.stock_quantity}
                            onChange={(e) => {
                              const value = e.target.value.trim();
                              let newQuantity = editData.stock_quantity;
                              if (/^[+-]\d+$/.test(value)) {
                                newQuantity = Math.max(0, editData.stock_quantity + parseInt(value));
                              } else if (/^\d+$/.test(value)) {
                                newQuantity = parseInt(value);
                              }
                              setEditData({
                                ...editData,
                                stock_quantity_input: value,
                                stock_quantity: newQuantity,
                              });
                            }}
                          />
                        </td>
                        <td><input value={editData.dimension_data} onChange={(e) => setEditData({ ...editData, dimension_data: e.target.value })} /></td>
                        <td>
                          <textarea
                            value={editData.description || ""}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            rows={4}
                            className="inputStyle"
                          />
                        </td>
                        <td>
                          <button onClick={saveEdit}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                          {product.photo_url ? (
                            <img src={product.photo_url} alt={product.product_name} style={{ width: "60px", borderRadius: "6px" }} />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td>{product.product_name}</td>
                        <td>{product.price}₾</td>
                        <td>
                          <span className={`stock-label ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.stock_quantity > 0
                              ? `In Stock (${product.stock_quantity})`
                              : "Out of Stock (0)"}
                          </span>
                        </td>
                        <td>{product.dimension_data}</td>
                        <td style={{ whiteSpace: "pre-line" }}>{product.description}</td>
                        <td>
                          <button onClick={() => startEdit(product)}>Edit</button>
                          <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}


