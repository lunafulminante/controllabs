import type { Request, Response } from 'express';
import type { Incident, IncidentSeverity, IncidentStatus } from '../interfaces';
import { environments, equipmentList, incidents } from '../data/store';

interface CreateIncidentBody {
    descripcion: string;
    equipoId?: string;
    ambienteId?: string;
    severidad: IncidentSeverity;
}

interface UpdateIncidentBody {
    estado: IncidentStatus;
}

const severities: IncidentSeverity[] = ['baja', 'media', 'alta', 'critica'];
const statuses: IncidentStatus[] = ['pendiente', 'en proceso', 'resuelto'];

export const createIncident = (
    req: Request<Record<string, never>, Incident | { message: string }, CreateIncidentBody>,
    res: Response<Incident | { message: string }>
) => {
    const { descripcion, equipoId, ambienteId, severidad } = req.body;
    const hasEquipment = typeof equipoId === 'string' && equipoId.length > 0;
    const hasEnvironment = typeof ambienteId === 'string' && ambienteId.length > 0;

    if (
        typeof descripcion !== 'string' ||
        !descripcion.trim() ||
        hasEquipment === hasEnvironment ||
        !severities.includes(severidad)
    ) {
        return res.status(400).json({
            message: 'La novedad requiere descripción, severidad válida y exactamente un equipo o ambiente',
        });
    }

    if (hasEquipment && !equipmentList.some((item) => item.id === equipoId)) {
        return res.status(400).json({ message: 'El equipo asociado no existe' });
    }

    if (hasEnvironment && !environments.some((environment) => environment.id === ambienteId)) {
        return res.status(400).json({ message: 'El ambiente asociado no existe' });
    }

    const incident: Incident = {
        id: Date.now().toString(),
        descripcion: descripcion.trim(),
        ...(hasEquipment ? { equipoId } : {}),
        ...(hasEnvironment ? { ambienteId } : {}),
        severidad,
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString(),
    };

    incidents.push(incident);
    return res.status(201).json(incident);
};

export const listIncidents = (_req: Request, res: Response<Incident[]>) => {
    res.json(incidents);
};

export const updateIncidentStatus = (
    req: Request<{ id: string }, Incident | { message: string }, UpdateIncidentBody>,
    res: Response<Incident | { message: string }>
) => {
    const incident = incidents.find((item) => item.id === req.params.id);
    if (!incident) {
        return res.status(404).json({ message: 'Novedad no encontrada' });
    }

    const { estado } = req.body;
    if (!statuses.includes(estado)) {
        return res.status(400).json({ message: 'Estado de novedad inválido' });
    }

    incident.estado = estado;
    return res.json(incident);
};
