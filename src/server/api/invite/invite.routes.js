
import { Router } from 'express';
import * as controller from './invite.controller';

const router = new Router();

router.get('/', controller.searchInvites);
router.post('/', controller.createInvite);
router.put('/:id', controller.updateInvite);
router.delete('/:id', controller.deleteInvite);

export default router;

