const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");


router.post("/", productController.Createproduct);
router.patch("/:id", productController.updateproduct);
router.get("/", productController.getAllproducts);
router.get("/:id", productController.getproductById);
router.delete("/:id", productController.deleteproduct);

module.exports = router;
    