import { Request, Response, NextFunction } from 'express';

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = String(req.params.id ?? '').trim();

  if (!/^[1-9]\d*$/.test(id)) {
    res.status(400).json({
      success: false,
      error: 'El ID del usuario debe ser un número entero positivo.'
    });
    return;
  }

  next();
};