import { Request, Response } from 'express';

export class RoomController {
  public static createRoom = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body y responder 201 con el préstamo creado.
    res.status(501).json({
      success: false,
      message: 'El registro de habitaciones todavía no está implementado.'
    });
  };

  public static getRoomsByFilter = (req: Request, res: Response): void => {
    // TODO: tomar los filtros de req.query, llamar al servicio y responder con los resultados.
    res.status(501).json({
      success: false,
      message: 'La consulta de habitaciones todavía no está implementada.'
    });
  };

  public static updateRoom = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de actualización y responder con el resultado.
    res.status(501).json({
      success: false,
      message: `La actualización de la habitación ${id} todavía no está implementada.`
    });
  };

}