"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const environment_routes_1 = __importDefault(require("./routes/environment.routes"));
const equipment_routes_1 = __importDefault(require("./routes/equipment.routes"));
const incident_routes_1 = __importDefault(require("./routes/incident.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Prefijo de versión para la API
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/environments', environment_routes_1.default);
app.use('/api/v1/equipment', equipment_routes_1.default);
app.use('/api/v1/incidents', incident_routes_1.default);
app.use('/api/v1/dashboard', dashboard_routes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', timestamp: new Date().toISOString() });
});
exports.default = app;
//# sourceMappingURL=app.js.map