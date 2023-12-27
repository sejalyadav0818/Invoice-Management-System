const Constants = require("../utils/constants");
const mongoose = require("mongoose");
require("dotenv").config();
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(Constants.CONNECTED_TO_MONGODB);
  } catch (error) {
    console.error(Constants.CONNECTION_ERROR_MONGODB, error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
