
import { Request, Response, NextFunction } from 'express';

export const validateRoom = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, capacity, status } = req.body;

  const isValidRoom =
    typeof name === 'string' &&
    name.trim() !== '' &&
    Number.isInteger(capacity) &&
    capacity > 0 &&
    typeof status === 'string' &&
    status.trim() !== '';

  if (!isValidRoom) {
    res.status(400).json({
      success: false,
      error: 'Los datos de la habitación son inválidos.'
    });
    return;
  }

  next();
};
