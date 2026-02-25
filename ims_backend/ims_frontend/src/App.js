import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import SupplierList from "./components/SupplierList";
import SupplierForm from "./components/SupplierForm";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";

function App() {
  return (
    <Router>

      {/* ===== NAVBAR ===== */}
      <nav style={{ background: "#1F2937", padding: "10px" }}>
        <Link to="/" style={{ color: "white",marginLeft:'20px',fontSize:'20px',textDecoration:'none',fontWeight:'bold' }}>Home</Link>
        <Link to="/products" style={{ color: "white",marginLeft:'25px',fontSize:'20px',textDecoration:'none',fontWeight:'bold' }}>Products</Link>
        <Link to="/suppliers" style={{ color: "white", marginLeft:'30px',fontSize:'20px',textDecoration:'none',fontWeight:'bold' }}>Suppliers</Link>
        <Link to="/orders" style={{ color: "white", marginLeft:'35px',fontSize:'20px',textDecoration:'none',fontWeight:'bold' }}>Orders</Link>
        <Link to="/invoices" style={{ color: "white",fontSize:'20px',marginLeft:'40px',textDecoration:'none',fontWeight:'bold' }}>Invoices</Link>
      </nav>

      {/* ===== ROUTES ===== */}
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Products */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-add" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />   
         
        {/* Suppliers */}
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/supplier-add" element={<SupplierForm />} />
        <Route path="/supplier-edit/:id" element={<SupplierForm />} />

        {/* Orders */}
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order-add" element={<OrderForm />} />
        <Route path="/order-edit/:id" element={<OrderForm />} />

        {/* Invoices */}
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/create-invoice" element={<InvoiceForm />} />
        <Route path="/edit-invoice/:id" element={<InvoiceForm/>}/>

      </Routes>

    </Router>
  );
}

export default App;
