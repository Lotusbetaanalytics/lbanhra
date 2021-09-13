const express = require('express');
const { complaintForm, suggestionForm } = require("../controllers/complaints");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route('/complaint').post(protect, complaintForm);
router.route('/suggestion').post(protect, suggestionForm);

module.exports = router;