const Crypto = require("../models/Crypto");

const listAll = async (req, res) => {
  const cryptos = await Crypto.find().sort({ createdAt: -1 });
  return res.status(200).json({ data: cryptos });
};

const listGainers = async (req, res) => {
  const cryptos = await Crypto.find().sort({ change24h: -1 });
  return res.status(200).json({ data: cryptos });
};

const listNew = async (req, res) => {
  const cryptos = await Crypto.find().sort({ createdAt: -1 });
  return res.status(200).json({ data: cryptos });
};

const createCrypto = async (req, res) => {
  const { name, symbol, price, image, change24h } = req.body;

  if (!name || !symbol || price === undefined || !image || change24h === undefined) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const crypto = await Crypto.create({
    name,
    symbol,
    price,
    image,
    change24h,
  });

  return res.status(201).json({ data: crypto });
};

module.exports = {
  listAll,
  listGainers,
  listNew,
  createCrypto,
};
