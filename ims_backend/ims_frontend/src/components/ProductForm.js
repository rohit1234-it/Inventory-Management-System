import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
  getSuppliers
} from "../api";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
  name: "",
  description: "",
  quantity: "",
  price: "",
  supplier: ""
});
  

  const [suppliers, setSuppliers] = useState([]);

  // Load suppliers
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Load product if editing
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (error) {
      console.error("Error loading suppliers:", error);
    }
  };

  // ✅ FIXED FUNCTION
  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);

      setProduct({
        name: res.data.name || "",
        description: res.data.description || "",
        quantity: res.data.quantity || "",
        price: res.data.price || "",
        supplier: res.data.supplier || ""
      });

    } catch (error) {
      console.error("Error loading product:", error);
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!product.supplier) {
    alert("Please select supplier");
    return;
  }

  const formattedProduct = {
    name: product.name,
    description: product.description,
    quantity: parseInt(product.quantity),
    price: parseFloat(product.price),
    supplier: parseInt(product.supplier)  // 🔥 MUST BE NUMBER
  };

  console.log("Sending:", formattedProduct);

  try {
    if (id) {
      await updateProduct(id, formattedProduct);
      alert("Product updated successfully!");
    } else {
      await createProduct(formattedProduct);
      alert("Product added successfully!");
    }

    navigate("/");
  } catch (err) {
    console.error("Backend Error:", err.response?.data);
  }
};

  return (
    <div style={{ padding: "20px", backgroundColor:'#F1F5F9', height:'530px'}}>
      <h2 style={{fontSize:'30px'}}>
        {id ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>

        <div style={{ marginBottom: "10px"}}>
          <label>Name:</label><br />
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            style={{ width: "100%", fontSize:'20px' }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label><br />
          <input
            name="description"
            value={product.description}
            onChange={handleChange}
            style={{ width: "100%",fontSize:'20px' }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Quantity:</label><br />
          <input
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
            required
            style={{ width: "100%",fontSize:'20px'}}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Price:</label><br />
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
            style={{ width: "100%",fontSize:'20px'}}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Supplier:</label><br />
          <select
            name="supplier"
            value={product.supplier_id}
            onChange={handleChange}
            required
            style={{ width: "100%",fontSize:'20px'}}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Removed Link from Submit Button */}
        <button
          type="submit"
          style={{
            height:'30px',
            width:'90px',
            cursor:'pointer',
            fontSize:'20px',
            backgroundColor:'green',
            color:'white'
          }}
        >
          {id ? "Update" : "Add"}
        </button>

        <Link to="/">
          <button
            type="button"
            style={{
              marginLeft: "50px",
              height:'30px',
              cursor:'pointer',
              width:'90px',
              fontSize:'20px',
              backgroundColor:'blue',
              color:'white'
            }}
          >
            Back
          </button>
        </Link>

      </form>
    </div>
  );
};

export default ProductForm;