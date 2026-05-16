import { Router } from 'express';
import * as leadController from '../controllers/lead.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createLeadSchema, updateLeadSchema, leadQuerySchema } from '../validators/lead.validator';
import { UserRole } from '../types/enums';

const router = Router();

router.use(protect); // All lead routes are protected

router.get('/analytics', authorize(UserRole.Admin), leadController.getAnalytics);
router.get('/export/csv', validate(leadQuerySchema), leadController.exportCsv);

router.route('/')
  .get(validate(leadQuerySchema), leadController.getLeads)
  .post(validate(createLeadSchema), leadController.createLead);

router.route('/:id')
  .get(leadController.getLead)
  .put(validate(updateLeadSchema), leadController.updateLead)
  .delete(authorize(UserRole.Admin), leadController.deleteLead);

export default router;
