const express = require("express");
const router = express.Router();
const { startInterview } =  require("../controllers/exitInterview");
const { protect } = require("../middleware/auth");

router.route("/").post(protect, startInterview);


module.exports = router;