
import { Router } from 'express';
import * as controller from './invite.controller';

const router = new Router();

router.post('/', controller.addInvite);
router.delete('/:id', controller.removeInvite);

export default router;

