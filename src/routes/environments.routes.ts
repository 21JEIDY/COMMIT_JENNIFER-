import { Router } from 'express';
import {
    getEnvironments,
    createEnvironment,
    updateEnvironment
} from '../controllers/environments.controller';

const router = Router();

router.get('/', getEnvironments);
router.post('/', createEnvironment);
router.patch('/:id', updateEnvironment);

export default router;
