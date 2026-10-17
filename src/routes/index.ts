import { Router } from 'express';
import loanRoutes from './loan.routes';
import usersRoutes from './users.routes';
import environmentsRoutes from './environments.routes';
import equipmentRoutes from './equipment.routes';

const router = Router();

router.use('/loans', loanRoutes);
router.use('/users', usersRoutes);
router.use('/environments', environmentsRoutes);
router.use('/equipment', equipmentRoutes);

export default router;
