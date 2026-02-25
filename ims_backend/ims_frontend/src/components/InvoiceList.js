import React, { useEffect, useState } from "react";
import { getInvoices, deleteInvoice } from "../api";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteInvoice(id);
      loadInvoices();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div style={{ padding: "20px",backgroundColor:'#F1F5F9',fontSize:'20px',height:'530px'  }}>
      <h2>Invoices</h2>

      {/* NEW INVOICE BUTTON */}
      <div style={{ marginBottom: "10px",fontSize:'20px' }}>
        <Link to="/create-invoice">
          <button style={{ marginBottom: "15px",height:'30px',cursor:'pointer',width:'150px', fontSize:'20px', backgroundColor:'blue',color:'white' }}>+ New Invoice</button>
        </Link>
      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Invoice Number</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.order_id}</td>
                <td>{invoice.invoice_number}</td>
                <td>{invoice.customer_name}</td>
                <td>₹{invoice.total_amount}</td>
                <td>
                  {new Date(invoice.invoice_date).toLocaleString()}
                </td>
                <td>
                  <button onClick={() => handleDelete(invoice.id)} style={{ marginLeft: "50px",height:'30px',width:'90px', cursor:'pointer',fontSize:'20px', backgroundColor:'red',color:'white' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" align="center">
                No Invoices Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
