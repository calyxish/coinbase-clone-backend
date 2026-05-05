const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  // Clean up the URI just in case it was pasted with accidental quotes or spaces
  const cleanUri = mongoUri.replace(/['"]/g, "").trim();

  try {
    const conn = await mongoose.connect(cleanUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
