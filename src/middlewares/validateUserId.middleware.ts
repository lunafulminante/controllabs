
import { Request, Response, NextFunction } from 'express';

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = String(req.params.id ?? '').trim();

  if (id === '') {
    res.status(400).json({
      success: false,
      error: 'El ID del usuario es obligatorio.'
    });
    return;
  }

  next();
};
