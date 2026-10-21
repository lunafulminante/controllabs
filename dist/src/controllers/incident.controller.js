"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIncidentStatus = exports.listIncidents = exports.createIncident = void 0;
const store_1 = require("../data/store");
const severities = ['baja', 'media', 'alta', 'critica'];
const statuses = ['pendiente', 'en proceso', 'resuelto'];
const createIncident = (req, res) => {
    const { descripcion, equipoId, ambienteId, severidad } = req.body;
    const hasEquipment = typeof equipoId === 'string' && equipoId.length > 0;
    const hasEnvironment = typeof ambienteId === 'string' && ambienteId.length > 0;
    if (typeof descripcion !== 'string' ||
        !descripcion.trim() ||
        hasEquipment === hasEnvironment ||
        !severities.includes(severidad)) {
        return res.status(400).json({
            message: 'La novedad requiere descripción, severidad válida y exactamente un equipo o ambiente',
        });
    }
    if (hasEquipment && !store_1.equipmentList.some((item) => item.id === equipoId)) {
        return res.status(400).json({ message: 'El equipo asociado no existe' });
    }
    if (hasEnvironment && !store_1.environments.some((environment) => environment.id === ambienteId)) {
        return res.status(400).json({ message: 'El ambiente asociado no existe' });
    }
    const incident = {
        id: Date.now().toString(),
        descripcion: descripcion.trim(),
        ...(hasEquipment ? { equipoId } : {}),
        ...(hasEnvironment ? { ambienteId } : {}),
        severidad,
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString(),
    };
    store_1.incidents.push(incident);
    return res.status(201).json(incident);
};
exports.createIncident = createIncident;
const listIncidents = (_req, res) => {
    res.json(store_1.incidents);
};
exports.listIncidents = listIncidents;
const updateIncidentStatus = (req, res) => {
    const incident = store_1.incidents.find((item) => item.id === req.params.id);
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
exports.updateIncidentStatus = updateIncidentStatus;
//# sourceMappingURL=incident.controller.js.map