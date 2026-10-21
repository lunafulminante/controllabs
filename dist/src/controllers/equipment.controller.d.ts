import type { Request, Response } from 'express';
import type { Equipment } from '../interfaces';
type CreateEquipmentBody = Pick<Equipment, 'nombre' | 'ambienteId'> & Partial<Pick<Equipment, 'estadoTecnico' | 'ubicacionEspecifica'>>;
type UpdateEquipmentBody = Partial<Pick<Equipment, 'estadoTecnico' | 'ubicacionEspecifica'>>;
export declare const registerEquipment: (req: Request<Record<string, never>, Equipment | {
    message: string;
}, CreateEquipmentBody>, res: Response<Equipment | {
    message: string;
}>) => Response<Equipment | {
    message: string;
}, Record<string, any>>;
export declare const listEquipment: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const updateEquipmentStatus: (req: Request<{
    id: string;
}, Equipment | {
    message: string;
}, UpdateEquipmentBody>, res: Response<Equipment | {
    message: string;
}>) => Response<Equipment | {
    message: string;
}, Record<string, any>>;
export {};
//# sourceMappingURL=equipment.controller.d.ts.map