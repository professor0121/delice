import { ApiError } from "./apiError.js";

export const globalErrorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};
