import { Request, Response, NextFunction } from 'express';

export const validateDashboardId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = String(req.params.id ?? '').trim();

  if (!id) {
    res.status(400).json({
      success: false,
      message: 'El ID del dashboard es obligatorio.'
    });
    return;
  }

  next();
};