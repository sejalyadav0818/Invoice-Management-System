const Invoice = require("../Models/invoiceSChema");
const Job = require("../Models/jobSchema");
const Constants = require("../utils/constants");

const getAllInvoice = async (req, res, next) => {
  try {
    const InvoiceData = await Invoice.find({ isdeleted: true }).select("-__v");
    console.log(InvoiceData);
    res.status(200).json({ data: InvoiceData });
  }  catch (error) {
    console.error(error);
    res.status(400).json({ message: "Oops, Something went wrong!" });
  }
};

const convertToInvoice = async (req, res, next) => {
  const { jobId  } = req.params;
console.log(jobId,"fejiljqfjjwdi");
  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: Constants.JOB_NOT_FOUND });
    }

    if (job.convertedToInvoice) {
      return res.status(400).json({ error: Constants.JOB_ALREADY_CONVERTED });
    }

    const invoice = new Invoice({
      title: job.title,
      product: job.product,
      notes: job.notes,
      tax: job.tax,
      subtotal: job.subtotal,
      total: job.total,
    });

    await invoice.save();
    job.convertedToInvoice = true;
    await job.save();

    res.status(200).json({
      data: invoice,
      message: Constants.JOB_CONVERTED_SUCCESSFULLY,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (req, res, next) => {
  const invoiceId = req.params.id;

  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ error: Constants.INVOICE_NOT_FOUND });
    }

    invoice.isdeleted = true;
    await invoice.save();

    res.status(200).json({ message: Constants.INVOICE_DELETED_SUCCESSFULLY });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllInvoice, convertToInvoice, deleteInvoice };
