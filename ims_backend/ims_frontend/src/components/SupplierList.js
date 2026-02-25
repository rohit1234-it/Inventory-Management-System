import React, { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "../api";
import { Link } from "react-router-dom";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        fetchSuppliers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ padding: "20px",backgroundColor:'#F1F5F9',fontSize:'20px',height:'530px' }}>
      <h2>Supplier List</h2>
      <Link to="/supplier-add">
        <button style={{marginBottom: "15px",height:'30px',cursor:'pointer',width:'90px', fontSize:'20px', backgroundColor:'blue',color:'white' }}>Add</button>
      </Link>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No suppliers found</td>
            </tr>
          ) : (
            suppliers.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.address}</td>
                <td>
                  <Link to={`/supplier-edit/${s.id}`}><button style={{marginLeft:'20px',cursor:'pointer',height:'30px',width:'90px', fontSize:'20px', backgroundColor:'green',color:'white'}}>Edit</button></Link>
                  <button onClick={() => handleDelete(s.id)} style={{marginLeft: "50px",height:'30px',width:'90px', cursor:'pointer',fontSize:'20px', backgroundColor:'red',color:'white' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;