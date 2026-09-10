import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [orders, setOrders] = useState([
    { id: 1, product: "Laptop", status: "Delivered", price: 800 },
    { id: 2, product: "Phone", status: "Pending", price: 500 },
    { id: 3, product: "Headphones", status: "Cancelled", price: 100 },
  ]);

  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  // Add Order
  const addOrder = () => {
    if (!product || !price) return;

    const newOrder = {
      id: orders.length + 1,
      product,
      status: "Pending",
      price: Number(price),
    };

    setOrders([...orders, newOrder]);
    setProduct("");
    setPrice("");
  };

  // Delete Order
  const deleteOrder = (id) => {
    const filtered = orders.filter((order) => order.id !== id);
    setOrders(filtered);
  };

  // Calculations
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
  const delivered = orders.filter(o => o.status === "Delivered").length;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>${totalRevenue}</p>
        </div>

        <div className="card">
          <h3>Delivered</h3>
          <p>{delivered}</p>
        </div>
      </div>

      {/* Add Order */}
      <div className="form">
        <input
          type="text"
          placeholder="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addOrder}>Add Order</button>
      </div>

      {/* Table */}
      <div className="table-section">
        <h3>Orders</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Status</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.product}</td>

                <td className={order.status.toLowerCase()}>
                  {order.status}
                </td>

                <td>${order.price}</td>

                <td>
                  <button onClick={() => deleteOrder(order.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;