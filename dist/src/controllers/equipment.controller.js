"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEquipmentStatus = exports.listEquipment = exports.registerEquipment = void 0;
const store_1 = require("../data/store");
const equipmentStatuses = ['operativo', 'en mantenimiento', 'dañado'];
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const registerEquipment = (req, res) => {
    const body = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }
    const { nombre, ambienteId, estadoTecnico, ubicacionEspecifica } = body;
    if (typeof nombre !== 'string' ||
        !nombre.trim() ||
        typeof ambienteId !== 'string' ||
        !ambienteId ||
        ('estadoTecnico' in body && !equipmentStatuses.includes(estadoTecnico)) ||
        ('ubicacionEspecifica' in body &&
            (typeof ubicacionEspecifica !== 'string' || !ubicacionEspecifica.trim())) ||
        Object.keys(body).some((key) => !['nombre', 'ambienteId', 'estadoTecnico', 'ubicacionEspecifica'].includes(key))) {
        return res.status(400).json({ message: 'Datos de equipo inválidos' });
    }
    if (!store_1.environments.some((environment) => environment.id === ambienteId)) {
        return res.status(400).json({ message: 'El ambiente asociado no existe' });
    }
    const item = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        ambienteId,
        estadoTecnico: estadoTecnico === undefined ? 'operativo' : estadoTecnico,
        ubicacionEspecifica: ubicacionEspecifica === undefined ? '' : ubicacionEspecifica.trim(),
    };
    store_1.equipmentList.push(item);
    return res.status(201).json(item);
};
exports.registerEquipment = registerEquipment;
const listEquipment = (req, res) => {
    const { ambienteId } = req.query;
    if (typeof ambienteId === 'string') {
        return res.json(store_1.equipmentList.filter((item) => item.ambienteId === ambienteId));
    }
    if (ambienteId !== undefined) {
        return res.status(400).json({ message: 'El filtro ambienteId debe ser un único texto' });
    }
    return res.json(store_1.equipmentList);
};
exports.listEquipment = listEquipment;
const updateEquipmentStatus = (req, res) => {
    const item = store_1.equipmentList.find((equipment) => equipment.id === req.params.id);
    if (!item)
        return res.status(404).json({ message: 'Equipo no encontrado' });
    const body = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }
    const keys = Object.keys(body);
    if (keys.length === 0 ||
        keys.some((key) => !['estadoTecnico', 'ubicacionEspecifica'].includes(key)) ||
        ('estadoTecnico' in body && !equipmentStatuses.includes(body.estadoTecnico)) ||
        ('ubicacionEspecifica' in body &&
            (typeof body.ubicacionEspecifica !== 'string' || !body.ubicacionEspecifica.trim()))) {
        return res.status(400).json({ message: 'Campos de actualización de equipo inválidos' });
    }
    if ('estadoTecnico' in body)
        item.estadoTecnico = body.estadoTecnico;
    if ('ubicacionEspecifica' in body)
        item.ubicacionEspecifica = body.ubicacionEspecifica.trim();
    return res.json(item);
};
exports.updateEquipmentStatus = updateEquipmentStatus;
//# sourceMappingURL=equipment.controller.js.map