import { Request, Response, NextFunction } from 'express';
import { ICreateUserDTO } from '../dtos/user.dto';

const isCreateUserDTO = (
  value: unknown
): value is ICreateUserDTO => {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.name === 'string' &&
    user.name.trim() !== '' &&
    typeof user.email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) &&
    typeof user.role === 'string' &&
    user.role.trim() !== ''
  );
};

export const validateUserPayload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body: unknown = req.body;

  if (!isCreateUserDTO(body)) {
    res.status(400).json({
      success: false,
      error: 'Los datos del usuario son inválidos.'
    });
    return;
  }

  next();
};