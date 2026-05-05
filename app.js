const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const cryptoRoutes = require("./routes/crypto");
const profileRoutes = require("./routes/profile");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(morgan("dev"));
app.use(
	cors({
		origin: corsOrigin,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use(authRoutes);
app.use(cryptoRoutes);
app.use(profileRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
