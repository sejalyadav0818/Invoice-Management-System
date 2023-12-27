import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductDashboard from "./Components/pages/Product/ProductDashboard";
import JobProductDashboard from "./Components/pages/job/JobDashboard";
import NavbarComponent from "../src/Common/NavbarComponent";
import InvoiceDisplay from "./Components/pages/invoice/InvoiceDisplay";
function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/products" element={<ProductDashboard />} />
        <Route path="/job" element={<JobProductDashboard />} />
        <Route path="/invoices" element={<InvoiceDisplay />} />
      </Routes>
    </>
  );
}

export default App;