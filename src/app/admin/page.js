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
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch("/api/products/get-all")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("/api/admin/db-tables")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      stock_status: "In Stock",
      category_id: 1,
    });
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
    <div className="admin-wrapper">
      <h1 className="admin-title">Admin Product Management</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <h2 className="form-title">Add New Product</h2>
        <input name="product_name" placeholder="Name" value={formData.product_name} onChange={handleInput} className="inputStyle" required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleInput} className="inputStyle" />
        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInput} className="inputStyle" />
        <input name="dimension_data" placeholder="Dimensions" value={formData.dimension_data} onChange={handleInput} className="inputStyle" />
        <select name="stock_status" value={formData.stock_status} onChange={handleInput} className="inputStyle">
          <option>In Stock</option>
          <option>Out of Stock</option>
        </select>
        <input name="category_id" type="number" placeholder="Category ID" value={formData.category_id} onChange={handleInput} className="inputStyle" />
        <button type="submit" className="submitButton">Add Product</button>
      </form>

      {Object.entries(grouped).map(([categoryId, items]) => (
        <div key={categoryId} className="admin-table-wrapper mt-12">
          <h2 className="text-xl font-bold mb-4">
            {categoryMap[categoryId] || `Category ID: ${categoryId}`}
          </h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
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
    </div>
  );
}