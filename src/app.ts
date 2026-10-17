
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', apiRoutes);

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'ControlLabs API operando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Rutas de la API
app.use('/api/v1', apiRoutes);

export default app;
