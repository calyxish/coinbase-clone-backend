const express = require("express");

const { login, logout, register } = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(logout));

module.exports = router;
