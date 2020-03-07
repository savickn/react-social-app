import { Router } from 'express';
import * as controller from './group.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.searchGroups); 
router.get('/:id', controller.getGroup); 
router.post('/', controller.addGroup); 
router.put('/:id', controller.updateGroup); 
router.delete('/:id', controller.deleteGroup); 

router.put('/:id/join', controller.joinGroup);
router.put('/:id/leave', controller.leaveGroup);

export default router;
