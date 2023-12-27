// const { body } = require("express-validator");
// const Constants = require("../utils/constants");

// // const createJobValidator = [
// //   body("title").notEmpty().withMessage(Constants.TITLE_REQUIRED),
// //   body("tags").notEmpty().isArray().withMessage(Constants.TAGS_ARRAY_REQUIRED),
// //   body("notes").optional().withMessage(Constants.NOTES_OPTIONAL),
// // ];

// const productValidator = [
//   body("name").notEmpty().withMessage(Constants.PRODUCT_NAME_REQUIRED),
//   body("description").notEmpty().withMessage(Constants.DESCRIPTION_OPTIONAL),
//   body("price").notEmpty().withMessage(Constants.PRICE_NUMERIC_REQUIRED),
// ];

// // const invoiceValidator = [
// //   body("title").notEmpty().withMessage(Constants.INVOICE_TITLE_REQUIRED),
// //   body("product")
// //     .notEmpty()
// //     .withMessage(Constants.PRODUCT_ID_REQUIRED)
// //     .isMongoId()
// //     .withMessage(Constants.INVALID_PRODUCT_ID),
// //   body("notes").optional().withMessage(Constants.NOTES_OPTIONAL),
// //   body("tax")
// //     .notEmpty()
// //     .isNumeric()
// //     .withMessage(Constants.TAX_NUMERIC_REQUIRED),
// //   body("subtotal")
// //     .notEmpty()
// //     .isNumeric()
// //     .withMessage(Constants.SUBTOTAL_NUMERIC_REQUIRED),
// //   body("total")
// //     .notEmpty()
// //     .isNumeric()
// //     .withMessage(Constants.TOTAL_NUMERIC_REQUIRED),
// //   // Chain withMessage directly to the optional() validator
// //   body("notes").optional().withMessage(Constants.NOTES_OPTIONAL),
// // ];

// module.exports = { productValidator };
