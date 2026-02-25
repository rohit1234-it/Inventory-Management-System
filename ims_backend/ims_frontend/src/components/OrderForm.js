import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProducts,
  createOrder,
  updateOrder,
  getOrderById
} from "../api";

function OrderForm() {
  const { id } = useParams();   // get order id from URL
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [order, setOrder] = useState({
    product: "",
    quantity: "",
    total_price: ""
  });

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  // If edit mode, load order data
  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const loadOrder = async () => {
    const res = await getOrderById(id);
    setOrder(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedOrder = { ...order, [name]: value };

    const selectedProduct = products.find(
      (p) => p.id === parseInt(updatedOrder.product)
    );

    if (selectedProduct && updatedOrder.quantity) {
      updatedOrder.total_price =
        selectedProduct.price * parseInt(updatedOrder.quantity);
    } else {
      updatedOrder.total_price = "";
    }

    setOrder(updatedOrder);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateOrder(id, order);
        alert("Order Updated Successfully");
      } else {
        await createOrder(order);
        alert("Order Created Successfully");
      }

      navigate("/orders");  // go back to list

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor:'#F1F5F9', height:'530px' }}>
      <h2 style={{fontSize:'30px'}}>{id ? "Edit Order" : "Add Order"}</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Product:</label><br />
          <select
            name="product"
            value={order.product}
            onChange={handleChange}
            required style={{fontSize:'20px'}}
          >
            <option value=""  style={{fontSize:'20px'}}>-- Select Product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} 
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Quantity:</label><br />
          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            required  style={{fontSize:'20px'}}
          />
        </div>

        <br />

        <div>
          <label>Total Price:</label><br />
          <input
            type="number"
            name="total_price"
            value={order.total_price}
            readOnly  style={{fontSize:'20px'}}
          />
        </div>

        <br />

        <button type="submit" style={{height:'30px',width:'150px',cursor:'pointer',fontSize:'20px',backgroundColor:'green',color:'white'}}>
          {id ? "Update Order" : "Create Order"}
        </button>

      </form>
    </div>
  );
}

export default OrderForm;
