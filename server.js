require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");

// Render dynamically assigns a PORT, usually 10000. Fall back to 5000 locally.
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("⏳ Starting server initialization...");
    
    // Attempt database connection first
    await connectDB(process.env.MONGODB_URI);
    
    // Start Express server only after DB is connected
    app.listen(port, () => {
      console.log(`✅ Server successfully listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
