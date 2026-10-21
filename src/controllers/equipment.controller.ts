import type { Request, Response } from 'express';
import type { Equipment } from '../interfaces';
import { environments, equipmentList } from '../data/store';

type EquipmentStatus = Equipment['estadoTecnico'];
type CreateEquipmentBody = Pick<Equipment, 'nombre' | 'ambienteId'> &
    Partial<Pick<Equipment, 'estadoTecnico' | 'ubicacionEspecifica'>>;
type UpdateEquipmentBody = Partial<Pick<Equipment, 'estadoTecnico' | 'ubicacionEspecifica'>>;

const equipmentStatuses: EquipmentStatus[] = ['operativo', 'en mantenimiento', 'dañado'];
const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

export const registerEquipment = (
    req: Request<Record<string, never>, Equipment | { message: string }, CreateEquipmentBody>,
    res: Response<Equipment | { message: string }>
) => {
    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }

    const { nombre, ambienteId, estadoTecnico, ubicacionEspecifica } = body;
    if (
        typeof nombre !== 'string' ||
        !nombre.trim() ||
        typeof ambienteId !== 'string' ||
        !ambienteId ||
        ('estadoTecnico' in body && !equipmentStatuses.includes(estadoTecnico as EquipmentStatus)) ||
        ('ubicacionEspecifica' in body &&
            (typeof ubicacionEspecifica !== 'string' || !ubicacionEspecifica.trim())) ||
        Object.keys(body).some(
            (key) => !['nombre', 'ambienteId', 'estadoTecnico', 'ubicacionEspecifica'].includes(key)
        )
    ) {
        return res.status(400).json({ message: 'Datos de equipo inválidos' });
    }

    if (!environments.some((environment) => environment.id === ambienteId)) {
        return res.status(400).json({ message: 'El ambiente asociado no existe' });
    }

    const item: Equipment = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        ambienteId,
        estadoTecnico: estadoTecnico === undefined ? 'operativo' : estadoTecnico as EquipmentStatus,
        ubicacionEspecifica: ubicacionEspecifica === undefined ? '' : (ubicacionEspecifica as string).trim(),
    };
    equipmentList.push(item);
    return res.status(201).json(item);
};

export const listEquipment = (req: Request, res: Response) => {
    const { ambienteId } = req.query;
    if (typeof ambienteId === 'string') {
        return res.json(equipmentList.filter((item) => item.ambienteId === ambienteId));
    }
    if (ambienteId !== undefined) {
        return res.status(400).json({ message: 'El filtro ambienteId debe ser un único texto' });
    }
    return res.json(equipmentList);
};

export const updateEquipmentStatus = (
    req: Request<{ id: string }, Equipment | { message: string }, UpdateEquipmentBody>,
    res: Response<Equipment | { message: string }>
) => {
    const item = equipmentList.find((equipment) => equipment.id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Equipo no encontrado' });

    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }

    const keys = Object.keys(body);
    if (
        keys.length === 0 ||
        keys.some((key) => !['estadoTecnico', 'ubicacionEspecifica'].includes(key)) ||
        ('estadoTecnico' in body && !equipmentStatuses.includes(body.estadoTecnico as EquipmentStatus)) ||
        ('ubicacionEspecifica' in body &&
            (typeof body.ubicacionEspecifica !== 'string' || !body.ubicacionEspecifica.trim()))
    ) {
        return res.status(400).json({ message: 'Campos de actualización de equipo inválidos' });
    }

    if ('estadoTecnico' in body) item.estadoTecnico = body.estadoTecnico as EquipmentStatus;
    if ('ubicacionEspecifica' in body) item.ubicacionEspecifica = (body.ubicacionEspecifica as string).trim();
    return res.json(item);
};
