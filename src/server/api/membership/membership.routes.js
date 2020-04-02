
import { Router } from 'express';
import * as controller from './membership.controller';

const router = new Router();

router.get('/', controller.searchMemberships);
router.get('/lookup', controller.getMembership);
router.post('/', controller.addMembership);
router.delete('/:id', controller.removeMembership);

export default router;
