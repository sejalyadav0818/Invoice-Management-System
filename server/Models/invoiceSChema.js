const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    tax: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
