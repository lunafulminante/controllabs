import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard.routes';
import environmentRoutes from './routes/environment.routes';
import equipmentRoutes from './routes/equipment.routes';
import incidentRoutes from './routes/incident.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Prefijo de versión para la API
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/environments', environmentRoutes);
app.use('/api/v1/equipment', equipmentRoutes);
app.use('/api/v1/incidents', incidentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', timestamp: new Date().toISOString() });
});

export default app;
