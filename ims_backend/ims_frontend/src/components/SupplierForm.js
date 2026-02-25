import React, { useState, useEffect } from "react";
import { createSupplier, updateSupplier, getSupplier } from "../api";
import { useNavigate, useParams, Link } from "react-router-dom";

const SupplierForm = () => {
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const navigate = useNavigate();
  const { id } = useParams(); // for edit

  useEffect(() => {
    if (id) fetchSupplier();
  }, [id]);

  const fetchSupplier = async () => {
    try {
      const res = await getSupplier(id);
      setSupplier(res.data);
    } catch (err) {
      console.error("Error fetching supplier", err);
    }
  };

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await updateSupplier(id, supplier);
      else await createSupplier(supplier);
      navigate("/suppliers"); // go back to supplier list
    } catch (err) {
      console.error("Error saving supplier", err);
    }
  };

  return (
    <div style={{ padding: "20px",backgroundColor:'#F1F5F9',fontSize:'20px',height:'530px' }}>
      <h2>{id ? "Edit Supplier" : "Add Supplier"}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label><br />
          <input name="name" value={supplier.name} onChange={handleChange} required style={{ width: "100%",fontSize:'20px' }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input name="email" type="email" value={supplier.email} onChange={handleChange} style={{ width: "100%",fontSize:'20px' }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Phone:</label><br />
          <input name="phone" value={supplier.phone} onChange={handleChange} style={{ width: "100%",fontSize:'20px' }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label><br />
          <textarea name="address" value={supplier.address} onChange={handleChange} style={{ width: "100%",fontSize:'20px' }} />
        </div>

        <button type="submit" style={{height:'30px',width:'90px',cursor:'pointer',fontSize:'20px',backgroundColor:'green',color:'white'}}> {id ? "Update" : "Add"} </button>
        <Link to="/suppliers"><button type="button" style={{ marginLeft: "10px",marginLeft: "50px",height:'30px',cursor:'pointer',width:'90px', fontSize:'20px', backgroundColor:'blue',color:'white'}}>Back</button></Link>
      </form>
    </div>
  );
};

export default SupplierForm;