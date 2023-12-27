const User = require("../models/User");

const successResponse = (res, message, data = null) => {
  return res.status(200).json({ success: true, message, data });
};

const errorResponse = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

const applySorting = (query, sort) => {
  if (sort) {
    const [field, order] = sort.split(":");
    query.sort({ [field]: order === "desc" ? -1 : 1 });
  }
};

const applySearching = (query, search) => {
  try {
    if (search !== undefined && search !== null) {
      const trimmedSearch = search.trim();
      if (trimmedSearch !== "") {
        const searchRegex = new RegExp(trimmedSearch, "i"); 
        query.or([{ username: searchRegex }, { email: searchRegex }]);
      }
    }
  } catch (error) {
    console.error("Error in applySearching:", error);
  }
};

const applyPagination = (query, page, limit) => {
  const skip = (page - 1) * limit;
  query.skip(skip).limit(limit);
};

module.exports = {
  applyPagination,
  applySearching,
  applySorting,
  successResponse,
  errorResponse,
};
