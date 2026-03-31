export const sendError = (res, error, status = 500) => {
  const code = error.code ?? "INTERNAL_ERROR";
  res.status(status).json({
    error: {
      code,
      message: error.message ?? "Unexpected error",
      details: error.details ?? null
    }
  });
};

export const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};
