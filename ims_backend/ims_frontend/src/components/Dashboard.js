import React, { useEffect, useState } from "react";
import { getProducts, getOrders, getInvoices } from "../api";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const productRes = await getProducts();
      const orderRes = await getOrders();
      const invoiceRes = await getInvoices();

      setTotalProducts(productRes.data.length);
      setTotalOrders(orderRes.data.length);

      const sales = invoiceRes.data.reduce(
        (sum, inv) => sum + parseFloat(inv.total_amount || 0),
        0
      );
      setTotalSales(sales);

      const data = orderRes.data.map((order) => ({
        name: `Order ${order.id}`,
        quantity: order.quantity,
        price: order.total_price,
      }));

      setChartData(data);
    } catch (error) {
      console.error("Dashboard load error", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* INTERNAL CSS */}
      <style>
        {`
        .dashboard-container {
          padding: 40px;
          background: linear-gradient(to right, #f8fafc, #eef2ff);
          min-height: 100vh;
        }

        .dashboard-title {
          text-align: center;
          font-size: 42px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 40px;
        }

        .cards-container {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .dashboard-card {
          background: #ffffff;
          padding: 25px;
          height: 140px;
          width: 250px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }

        .dashboard-card h3 {
          font-size: 18px;
          color: #64748b;
          margin-bottom: 10px;
        }

        .dashboard-card p {
          font-size: 28px;
          font-weight: bold;
          color: #1e293b;
        }

        .dashboard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .chart-container {
          margin-top: 60px;
          background: #ffffff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .chart-container h3 {
          text-align: center;
          margin-bottom: 20px;
          color: #1e293b;
        }
        `}
      </style>

      <h2 className="dashboard-title">Inventory Dashboard</h2>

      {/* Summary Cards */}
      
      <div className="cards-container">
      <Link to='/products'>
      <div className="dashboard-card" style={{textDecoration:'none'}}>
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div></Link>

        <Link to='/orders'>
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div></Link>

        <Link to='/Invoices'>
        <div className="dashboard-card">
          <h3>Total Sales</h3>
          <p>₹ {totalSales}</p>
        </div></Link>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <h3>Order Sales Chart</h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#6366f1" />
            <Bar dataKey="price" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}