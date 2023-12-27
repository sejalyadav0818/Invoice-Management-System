const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: ["one", "two", "three"],
    },
    notes: {
      type: String,
      default: "",
    },

    tax: {
      type: Number,
      default : 7,
    },
    subtotal: {
      type: Number,
      default : 0,
    },
    total: {
      type: Number,
      default : 0,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    convertedToInvoice: {
      type: Boolean,
      default: false,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
