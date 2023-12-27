const express = require("express");
const router = express.Router();
const invoieController = require("../controller/invoieController");

router.post("/convert-to-invoice/:jobId", invoieController.convertToInvoice);
router.get("/", invoieController.getAllInvoice);
router.delete("/:id", invoieController.deleteInvoice);

module.exports = router;
