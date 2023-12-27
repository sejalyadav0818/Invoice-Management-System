const express = require("express");
const router = express.Router();

const productRoute = require("../Router/productRoute");
const jobRoute = require("../Router/jobRoute");
const invoiceRoute = require("../Router/invoiceRoute");

router.use("/product", productRoute);
router.use("/job", jobRoute);
router.use("/invoice", invoiceRoute);
module.exports = router;

