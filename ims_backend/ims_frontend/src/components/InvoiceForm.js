import React, { useEffect, useState } from "react";
import { getOrders, createInvoice } from "../api";

const InvoiceForm = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [invoice, setInvoice] = useState({
    order: "",
    invoice_number: "",
    customer_name: "",
    total_amount: ""
  });

  // Load orders when component mounts
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (error) {
      console.error("Error loading orders:", error);
      alert("Failed to load orders");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "order") {
      const selectedOrder = orders.find(
        (o) => o.id === parseInt(value)
      );

      if (selectedOrder) {
        setInvoice((prev) => ({
          ...prev,
          order: selectedOrder.id,
          total_amount: selectedOrder.total_price // make sure field name matches backend
        }));
      }
    } else {
      setInvoice((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createInvoice(invoice);
      alert("Invoice created successfully ✅");

      // Reset form
      setInvoice({
        order: "",
        invoice_number: "",
        customer_name: "",
        total_amount: ""
      });

    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice ❌");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Invoice</h2>

      <form onSubmit={handleSubmit}>

        {/* Select Order */}
        <div>
          <label>Select Order:</label><br />
          <select
            name="order"
            value={invoice.order}
            onChange={handleChange}
            required style={{fontSize:'20px'}}
          >
            <option value="" style={{fontSize:'20px'}}>Select Order</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                Order #{o.id} - ₹{o.total_price}
              </option>
            ))}
          </select>
        </div>

        <br />

        {/* Invoice Number */}
        <div>
          <label>Invoice Number:</label><br />
          <input
            type="text"
            name="invoice_number"
            value={invoice.invoice_number}
            onChange={handleChange}
            required style={{fontSize:'20px'}}
          />
        </div>

        <br />

        {/* Customer Name */}
        <div>
          <label>Customer Name:</label><br />
          <input
            type="text"
            name="customer_name"
            value={invoice.customer_name}
            onChange={handleChange} style={{fontSize:'20px'}}
          />
        </div>

        <br />

        {/* Total Amount */}
        <div>
          <label>Total Amount:</label><br />
          <input
            type="number"
            name="total_amount"
            value={invoice.total_amount}
            readOnly style={{fontSize:'20px'}}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}  style={{
            height:'30px',
            width:'90px',
            cursor:'pointer',
            fontSize:'20px',
            backgroundColor:'green',
            color:'white'
          }}>
          {loading ? "Creating..." : "Create"}
        </button>

      </form>
    </div>
  );
};

export default InvoiceForm;
