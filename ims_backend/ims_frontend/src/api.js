import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
   PRODUCTS API
============================ */

export const getProducts = () => api.get("products/");

export const getProductById = (id) =>
  api.get(`products/${id}/`);

export const createProduct = (data) =>
  api.post("products/", data);

export const updateProduct = (id, data) =>
  api.put(`products/${id}/`, data);

export const deleteProduct = (id) =>
  api.delete(`products/${id}/`);

/* ============================
   SUPPLIERS API
============================ */

export const getSuppliers = () =>
  api.get("suppliers/");

export const getSupplier = (id) =>
  api.get(`suppliers/${id}/`);

export const createSupplier = (data) =>
  api.post("suppliers/", data);

export const updateSupplier = (id, data) =>
  api.put(`suppliers/${id}/`, data);

export const deleteSupplier = (id) =>
  api.delete(`suppliers/${id}/`);

/* ============================
   ORDERS API
============================ */

export const getOrders = () =>
  api.get("orders/");

export const createOrder = (data) =>
  api.post("orders/", data);

export const getOrderById = (id) =>
  api.get(`orders/${id}/`);

export const updateOrder = (id, data) =>
  api.put(`orders/${id}/`, data);

export const deleteOrder = (id) =>
  api.delete(`orders/${id}/`);

export const filterOrdersByProduct = (productId) =>
  api.get(`orders/?product=${productId}`);

export const filterOrdersByDate = (date) =>
  api.get(`orders/?date=${date}`);

export const searchOrders = (query) =>
  api.get(`orders/?search=${query}`);

/* ============================
   INVOICES API
============================ */

export const getInvoices = () =>
  api.get("invoices/");

export const createInvoice = (data) =>
  api.post("invoices/", data);


export const deleteInvoice = (id) =>
  api.delete(`invoices/${id}/`);

export default api;