
import { Router } from 'express';
import loanRoutes from './loan.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/loans', loanRoutes);
router.use('/users', usersRoutes);

export default router;
