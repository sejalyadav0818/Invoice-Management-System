const Product = require("../Models/ProductSchema");
const Invoice = require("../Models/invoiceSChema");
const Job = require("../Models/jobSchema");
const Constants = require("../utils/constants");

const CreateJob = async (req, res, next) => {
  const { title, tags, notes, product, tax, subtotal, total } = req.body;
  try {
    const selectedProduct = await Product.findById(product);

    if (!selectedProduct) {
      return res
        .status(400)
        .json({ message: Constants.SELECTED_PRODUCT_NOT_FOUND });
    }

    const parsedTax = parseFloat(tax);
    const parsedSubtotal = parseFloat(subtotal);
    const parsedTotal = parseFloat(total);

    if (isNaN(parsedTax) || isNaN(parsedSubtotal) || isNaN(parsedTotal)) {
      return res
        .status(400)
        .json({ message: Constants.INVALID_FINANCIAL_VALUES });
    }
    const newJob = new Job({
      title,
      tags,
      notes,
      product,
      tax: parsedTax,
      subtotal: parsedSubtotal,
      total: parsedTotal,
    });

    await newJob.save();
    res
      .status(201)
      .json({ data: newJob, message: Constants.JOB_CREATED_SUCCESSFULLY });
  } catch (error) {
    next(error);
  }
};

const getAllJObs = async (req, res, next) => {
  try {
    const jobsData = await Job.find({ isdeleted: false });
    res.status(200).json({ data: jobsData });
  } catch (error) {
    next(error);
  }
};

const getJObById = async (req, res) => {
  const { id } = req.params;

  try {
    const singleJobData = await Job.findById(id);
    singleJobData
      ? res.status(200).json({ data: singleJobData })
      : res.status(400).json({ error: Constants.JOB_NOT_FOUND });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existingJobData = await Job.findById(id);
    if (!existingJobData) {
      return res.status(404).json({ error: Constants.JOB_NOT_FOUND });
    }
    const propertiesToUpdate = [
      "title",
      "tags",
      "notes",
      "product",
      "tax",
      "subtotal",
      "total",
    ];

    for (const property of propertiesToUpdate) {
      if (req.body[property]) {
        existingJobData[property] = req.body[property];
      }
    }

    const updatedJObData = await existingJobData.save();
    updatedJObData
      ? res.status(200).json({
          data: updatedJObData,
          message: Constants.JOB_UPDATED_SUCCESSFULLY,
        })
      : res.status(400).json({ error: Constants.JOB_NOT_FOUND });
  } catch (error) {
    next(error);
  }
};

const DeleteJob = async (req, res, next) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: Constants.JOB_NOT_FOUND });
    }
    if (job.convertedToInvoice) {
      const invoice = await Invoice.findOne({ job: jobId });
      if (invoice) {
        await invoice.remove();
      }
    
    }
    job.isdeleted = true;
    await job.save();


    // //update 

    //    const invoice = await invoice.findOne({ invoice: invoiceId });
    // if (job) {
    //   job.convertedToInvoice = false;
    //   await job.save();
    // }


    res.status(200).json({ message: Constants.JOB_DELETED_SUCCESSFULLY });
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateJob, getAllJObs, getJObById, updateJob, DeleteJob };
