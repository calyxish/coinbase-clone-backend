const notFound = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
};

const errorHandler = (err, req, res, next) => {
  const isValidationError = err?.name === "ValidationError";
  const isDuplicateKey = err?.code === 11000;
  const statusFromResponse = res.statusCode;

  let statusCode = statusFromResponse && statusFromResponse !== 200 ? statusFromResponse : 500;

  if (isValidationError) {
    statusCode = 400;
  }

  if (isDuplicateKey) {
    statusCode = 409;
  }

  const message = isDuplicateKey
    ? "Duplicate key error"
    : err?.message || "Server error";

  res.status(statusCode).json({ message });
};

module.exports = { notFound, errorHandler };
