import type { Request, Response } from 'express';
import type { Incident, IncidentSeverity, IncidentStatus } from '../interfaces';
interface CreateIncidentBody {
    descripcion: string;
    equipoId?: string;
    ambienteId?: string;
    severidad: IncidentSeverity;
}
interface UpdateIncidentBody {
    estado: IncidentStatus;
}
export declare const createIncident: (req: Request<Record<string, never>, Incident | {
    message: string;
}, CreateIncidentBody>, res: Response<Incident | {
    message: string;
}>) => Response<Incident | {
    message: string;
}, Record<string, any>>;
export declare const listIncidents: (_req: Request, res: Response<Incident[]>) => void;
export declare const updateIncidentStatus: (req: Request<{
    id: string;
}, Incident | {
    message: string;
}, UpdateIncidentBody>, res: Response<Incident | {
    message: string;
}>) => Response<Incident | {
    message: string;
}, Record<string, any>>;
export {};
//# sourceMappingURL=incident.controller.d.ts.map