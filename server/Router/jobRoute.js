const express = require("express");
const router = express.Router();
const jobController = require("../controller/jobController");
const { createJobValidator } = require("../validators/Validator");

router.post("/", jobController.CreateJob);
router.patch("/:id", jobController.updateJob);
router.get("/", jobController.getAllJObs);
router.get("/:id", jobController.getJObById);
router.delete("/:id", jobController.DeleteJob);

module.exports = router;

