const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.log("error 1")
  res.status(404);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.log("error 2",statusCode)

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };