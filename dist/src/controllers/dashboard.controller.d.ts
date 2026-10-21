import type { Request, Response } from 'express';
interface DashboardSummary {
    totalUsuarios: number;
    ambientesActivos: number;
    equiposOperativos: number;
    novedadesCriticasSinResolver: number;
}
export declare const getSummary: (_req: Request, res: Response<DashboardSummary>) => void;
export {};
//# sourceMappingURL=dashboard.controller.d.ts.map