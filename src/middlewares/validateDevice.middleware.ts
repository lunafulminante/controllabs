
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

export const validateDevicePayload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body: unknown = req.body;

  if (!isCreateDeviceDTO(body)) {
    res.status(400).json({
      success: false,
      error: 'Los datos del dispositivo son inválidos.'
    });
    return;
  }

  next();
};
