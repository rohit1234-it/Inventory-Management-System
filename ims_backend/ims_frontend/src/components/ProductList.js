import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when component loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // Update state without reloading
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div style={{ padding: "20px",backgroundColor:'#F1F5F9',fontSize:'20px'}}>
      <h2>Product List</h2>

      <Link to="/product-add">
        <button style={{ marginBottom: "15px",height:'30px',cursor:'pointer',width:'90px', fontSize:'20px', backgroundColor:'blue',color:'white' }}>Add</button>
      </Link>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.quantity}</td>
                  <td>₹ {p.price}</td>
                  <td>{p.supplier}</td>
                  <td>
                    <Link to={`/edit-product/${p.id}`}>
                      <button style={{marginLeft:'20px',cursor:'pointer',height:'30px',width:'90px', fontSize:'20px', backgroundColor:'green',color:'white'}}>Edit</button>
                    </Link>

                    <button
                     onClick={() => handleDelete(p.id)}
                      style={{ marginLeft: "50px",height:'30px',width:'90px', cursor:'pointer',fontSize:'20px', backgroundColor:'red',color:'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;