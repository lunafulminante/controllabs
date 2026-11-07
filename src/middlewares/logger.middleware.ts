
import { Request, Response, NextFunction } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  const startTime = Date.now();

  console.log(
    `[AUDIT SENA] [${timestamp}] ${req.method} ${req.originalUrl}`
  );

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    console.log(
      `[AUDIT SENA] [${new Date().toISOString()}] ` +
      `${req.method} ${req.originalUrl} - ` +
      `Estado: ${res.statusCode} - ` +
      `Duración: ${duration}ms`
    );
  });

  next();
};
