import { Router } from 'express';
import { LoanController } from '../controllers/loan.controller';
import { validateLoanPayload } from '../middlewares/validateLoan.middleware';
import { validateLoanId } from '../middlewares/validateLoanId.middleware';

const router = Router();

router.post('/', validateLoanPayload, LoanController.createLoan);
router.get('/search', LoanController.getLoansByFilter);
router.get('/:id', validateLoanId, LoanController.getLoanById);
router.put('/:id/accept', validateLoanId, LoanController.acceptLoanInventory);

export default router;