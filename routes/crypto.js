const express = require("express");

const {
  listAll,
  listGainers,
  listNew,
  createCrypto,
} = require("../controllers/cryptoController");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/crypto", asyncHandler(listAll));
router.get("/crypto/gainers", asyncHandler(listGainers));
router.get("/crypto/new", asyncHandler(listNew));
router.post("/crypto", asyncHandler(createCrypto));

module.exports = router;
