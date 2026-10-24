const notFoundHandler = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    ok: false,
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
