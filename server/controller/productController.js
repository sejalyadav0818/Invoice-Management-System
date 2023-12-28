const Product = require("../Models/ProductSchema");
const Constants = require("../utils/constants");

const Createproduct = async (req, res, next) => {
  const { name, description, price } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
    });
    await newProduct.save();
    res.status(201).json({
      data: newProduct,
      message: Constants.PPRODUCT_CREATED_SUCCESSFULLY,
    });
  } catch (error) {
    next(error);
  }
};

const getAllproducts = async (req, res, next) => {
  try {
    const productsData = await Product.find({isdeleted : false});
    res.status(200).json({ data: productsData });
  } catch (error) {
    next(error);
  }
};

const getproductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const singleProductData = await Product.findById(id);
    singleProductData
      ? res.status(200).json({ data: singleProductData })
      : res.status(400).json({ error: Constants.PRODUCT_NOT_FOUND });
  } catch (error) {
    next(error);
  }
};

const updateproduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedProductData = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    updatedProductData
      ? res.status(200).json({
          data: updatedProductData,
          message: Constants.PRODUCT_UPDATED_SUCCESSFULLY,
        })
      : res.status(400).json({ error: Constants.PRODUCT_NOT_FOUND });
  } catch (error) {
    next(error);
  }
};

const deleteproduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndUpdate(
      id,
      { isdeleted: true },
      { new: true }
    );

    if (!deleteProduct) {
      return res.status(404).json({ error: Constants.PRODUCT_NOT_FOUND });
    }
    res.status(200).json({ message: Constants.PRODUCT_DELETED_SUCCESSFULLY });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Createproduct,
  getAllproducts,
  getproductById,
  updateproduct,
  deleteproduct,
};
