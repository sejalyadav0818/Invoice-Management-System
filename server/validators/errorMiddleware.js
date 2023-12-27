const Constants = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  console.error("Global error handler:", err);

  if (err.name === "ValidationError") {
    const errors = {};
    for (let field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res
      .status(400)
      .json({ message: Constants.INVALID_CREDENTIALS, errors });
  }
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res
      .status(400)
      .json({ message: Constants.INVALIDA_OBJECTID, error: err.message });
  }

  if (err.customErrorCode) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }

  res.status(500).json({ message: Constants.INTERNAL_ERROR });
};

module.exports = { errorHandler };
