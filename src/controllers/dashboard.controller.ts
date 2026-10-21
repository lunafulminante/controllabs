import type { Request, Response } from 'express';
import { environments, equipmentList, incidents, users } from '../data/store';

interface DashboardSummary {
    totalUsuarios: number;
    ambientesActivos: number;
    equiposOperativos: number;
    novedadesCriticasSinResolver: number;
}

export const getSummary = (_req: Request, res: Response<DashboardSummary>) => {
    res.json({
        totalUsuarios: users.filter((user) => !user.deleted).length,
        ambientesActivos: environments.filter((environment) => environment.estadoOperativo).length,
        equiposOperativos: equipmentList.filter((item) => item.estadoTecnico === 'operativo').length,
        novedadesCriticasSinResolver: incidents.filter(
            (incident) => incident.severidad === 'critica' && incident.estado !== 'resuelto'
        ).length,
    });
};
