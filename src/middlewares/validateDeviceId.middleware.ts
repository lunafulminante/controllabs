import { Request, Response, NextFunction } from 'express';
import { ICreateDeviceDTO } from '../dtos/device.dto';

const isCreateDeviceDTO = (
  value: unknown
): value is ICreateDeviceDTO => {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const device = value as Record<string, unknown>;

  return (
    typeof device.nombre === 'string' &&
    device.nombre.trim() !== '' &&
    typeof device.marca === 'string' &&
    device.marca.trim() !== '' &&
    typeof device.estado === 'string' &&
    device.estado.trim() !== ''
  );
};
export const validateDeviceId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = String(req.params.id ?? '').trim();

  if (id === '') {
    res.status(400).json({
      success: false,
      error: 'El ID del dispositivo es obligatorio.'
    });
    return;
  }

  next();
};
