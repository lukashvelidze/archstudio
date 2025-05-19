"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    setFormData({ product_name: "", description: "", price: "", dimension_data: "", stock_status: "In Stock", category_id: 1 });
    const res = await fetch("/api/products/get-all");
    const data = await res.json();
    setProducts(data);
  };

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

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.product_name}</td>
                <td>{product.price}₾</td>
                <td>
                  <span className={`stock-label ${product.stock_status === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>{product.stock_status}</span>
                </td>
                <td>{product.category_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Object.entries(tables).map(([tableName, rows]) => (
        <div key={tableName} className="admin-table-wrapper mt-12">
          <h2 className="text-xl font-bold mb-4">{tableName}</h2>
          <table className="admin-table">
            <thead>
              <tr>
                {rows[0] && Object.keys(rows[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, colIdx) => (
                    <td key={colIdx}>{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
