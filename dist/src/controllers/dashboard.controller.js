"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = void 0;
const store_1 = require("../data/store");
const getSummary = (_req, res) => {
    res.json({
        totalUsuarios: store_1.users.filter((user) => !user.deleted).length,
        ambientesActivos: store_1.environments.filter((environment) => environment.estadoOperativo).length,
        equiposOperativos: store_1.equipmentList.filter((item) => item.estadoTecnico === 'operativo').length,
        novedadesCriticasSinResolver: store_1.incidents.filter((incident) => incident.severidad === 'critica' && incident.estado !== 'resuelto').length,
    });
};
exports.getSummary = getSummary;
//# sourceMappingURL=dashboard.controller.js.map