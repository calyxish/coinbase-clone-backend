const express = require("express");

const { getProfile } = require("../controllers/profileController");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/profile", auth, asyncHandler(getProfile));

module.exports = router;
