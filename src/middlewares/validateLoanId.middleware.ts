
import { Request, Response, NextFunction } from 'express';

export const validateLoanId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = String(req.params.id ?? '').trim();

  if (id === '') {
    res.status(400).json({
      success: false,
      error: 'El ID del préstamo es obligatorio.'
    });
    return;
  }

  next();
};
