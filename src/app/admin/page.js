"use client";

import { useState, useEffect } from "react";
import "./admin.css";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [tables, setTables] = useState({});
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    dimension_data: "",
    stock_status: "In Stock",
    category_id: 1,
    photo_url: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    refreshProducts();
    fetch("/api/admin/db-tables")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);

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
      console.log("Uploaded image URL:", data.url); // ✅ You should see this
      setFormData((prev) => ({
        ...prev,
        photo_url: data.url,
      }));
      setImagePreview(data.url);
    } else {
      alert("Upload failed.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Final formData before submit", formData);
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
      stock_status: "In Stock",
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
    await fetch("/api/products/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
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

  const grouped = products.reduce((acc, product) => {
    const key = product.category_id;
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
        <h1 className="admin-title">Admin Product Dashboard</h1>

        <section className="dashboard-section">
          <h2 className="section-title">Add New Product</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <input name="product_name" placeholder="Name" value={formData.product_name} onChange={handleInput} className="inputStyle" required />
            <input name="description" placeholder="Description" value={formData.description} onChange={handleInput} className="inputStyle" />
            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInput} className="inputStyle" />
            <input name="dimension_data" placeholder="Dimensions" value={formData.dimension_data} onChange={handleInput} className="inputStyle" />
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="inputStyle" />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  marginTop: "10px",
                  maxWidth: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                }}
              />
            )}
            <select name="stock_status" value={formData.stock_status} onChange={handleInput} className="inputStyle">
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
            <select name="category_id" value={formData.category_id} onChange={handleInput} className="inputStyle">
              {(tables.Categories || []).map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name} (ID: {cat.id})</option>
              ))}
            </select>
            <button
              type="submit"
              className="submitButton"
              disabled={!formData.photo_url}
              style={{ opacity: formData.photo_url ? 1 : 0.5, cursor: formData.photo_url ? "pointer" : "not-allowed" }}
            >
              {formData.photo_url ? "Add Product" : "Upload Image First"}
            </button>
          </form>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">All Products</h2>
          {Object.entries(grouped).map(([categoryId, items]) => (
            <div key={categoryId} className="admin-table-card">
              <h3 className="table-title">{categoryMap[categoryId] || `Category ID: ${categoryId}`}</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Dimensions</th>
                    <th>Actions</th>
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
                          <select value={editData.stock_status} onChange={(e) => setEditData({ ...editData, stock_status: e.target.value })}>
                            <option>In Stock</option>
                            <option>Out of Stock</option>
                          </select>
                        </td>
                        <td><input value={editData.dimension_data} onChange={(e) => setEditData({ ...editData, dimension_data: e.target.value })} /></td>
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
                          <span className={`stock-label ${product.stock_status === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                            {product.stock_status}
                          </span>
                        </td>
                        <td>{product.dimension_data}</td>
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