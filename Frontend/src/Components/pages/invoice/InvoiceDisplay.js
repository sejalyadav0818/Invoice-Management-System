import React, { useEffect, useState } from "react";
import axios from "axios";
import InvoiceCard from "../../pages/invoice/InvoiceCard;";
import jsPDF from "jspdf";

const InvoiceDisplay = () => {
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/invoice`)
      .then((res) => {
        setInvoices(res.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteInvoice = async (invoiceId) => {
    try {
      await axios.delete(`http://localhost:5000/invoice/${invoiceId}`);
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice._id !== invoiceId)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const generateAndDownloadPDF = (invoiceData) => {
    const pdf = new jsPDF();
    pdf.text("Invoice Details", 10, 10);
    Object.entries(invoiceData).forEach(([key, value], index) => {
      const yPos = 20 + index * 10;
      pdf.text(`${key}: ${value}`, 10, yPos);
    });
    pdf.save(`Invoice_${invoiceData.title}.pdf`);
  };

  if (!invoices) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>All Invoices</h2>
      {invoices.map((invoice) => (
        <div key={invoice._id}>
          <InvoiceCard
            invoiceData={invoice}
            onDownload={() => generateAndDownloadPDF(invoice)}
            onDelete={() => deleteInvoice(invoice._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default InvoiceDisplay;
