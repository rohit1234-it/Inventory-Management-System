import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
getOrders,
updateOrder,
deleteOrder,
filterOrdersByProduct,
filterOrdersByDate,
searchOrders,
} from "../api";

function OrderList() {
const [orders, setOrders] = useState([]);
const [productId, setProductId] = useState("");
const [date, setDate] = useState("");
const [search, setSearch] = useState("");

useEffect(() => {
loadOrders();
}, []);

const loadOrders = async () => {
const res = await getOrders();
setOrders(res.data);
};

const handleDelete = async (id) => {
await deleteOrder(id);
loadOrders();
};

const handleProductFilter = async () => {
if (!productId) return;
const res = await filterOrdersByProduct(productId);
setOrders(res.data);
};

const handleDateFilter = async () => {
if (!date) return;
const res = await filterOrdersByDate(date);
setOrders(res.data);
};

const handleSearch = async () => {
if (!search) return;
const res = await searchOrders(search);
setOrders(res.data);
};

return (
<div style={{ padding: "20px",backgroundColor:'#F1F5F9',fontSize:'20px',height:'530px' }}> <h2>Orders</h2>


  {/* FILTER SECTION */}
  <div style={{marginTop:'10px'}}>
    <input
      type="text"
      placeholder="Search product"
      value={search}
      onChange={(e) => setSearch(e.target.value)} style={{fontSize:'20px'}}
    />
    <button onClick={handleSearch} style={{marginLeft:'30px',marginBottom: "15px",height:'30px',cursor:'pointer',width:'150px', fontSize:'20px', backgroundColor:'orange',color:'white'}}>Search</button>

    <button onClick={loadOrders} style={{marginLeft:'50px',marginBottom: "15px",height:'30px',cursor:'pointer',width:'150px', fontSize:'20px', backgroundColor:'brown',color:'white'}}>Reset</button>
  </div>

  {/* NEW ORDER BUTTON */}
  <Link to="/order-add">
    <button style={{ marginBottom: "15px",height:'30px',cursor:'pointer',width:'150px', fontSize:'20px', backgroundColor:'blue',color:'white' }}>+ New Order</button>
  </Link>

  {/* TABLE */}
  <table border="1" cellPadding="10">
    <thead>
      <tr>
        <th>ID</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {orders.map((order) => (
        <tr>
          <td>{order.id}</td>
          <td>{order.product_name}</td>
          <td>{order.quantity}</td>
          <td>{order.total_price}</td>
          <td>
            <Link to={`/order-edit/${order.id}`}>
              <button style={{marginLeft:'20px',cursor:'pointer',height:'30px',width:'90px', fontSize:'20px', backgroundColor:'green',color:'white'}}>Edit</button>
            </Link>
            <button onClick={() => handleDelete(order.id)}   style={{ marginLeft: "50px",height:'30px',width:'90px', cursor:'pointer',fontSize:'20px', backgroundColor:'red',color:'white' }}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


);
}

export default OrderList;
