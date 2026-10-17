import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'ControlLabs API operando correctamente',
        timestamp: new Date().toISOString()
    });
});

app.use(
    ['/api/v1/users', '/api/v1/environments', '/api/v1/equipment'],
    (req, res) => {
        res.status(501).json({
            status: 'error',
            message: 'Funcionalidad no implementada'
        });
    }
);

app.use('/api/v1', apiRoutes);

export default app;
