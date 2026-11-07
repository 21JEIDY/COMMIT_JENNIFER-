import { Router } from 'express';
import { LoanController } from '../controllers/loan.controller';

const router = Router();

router.get('/search', LoanController.getLoansByFilter);
router.get('/', LoanController.getLoansByFilter);
router.get('/:id', LoanController.getLoanById);
router.post('/:id/accept', LoanController.acceptLoanInventory);

export default router;

