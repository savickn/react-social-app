
import { Router } from 'express';

import * as controller from './chat.controller';

const router = new Router();

router.get('/', controller.searchChats);
router.get('/:id', controller.getChat);
router.post('/', controller.createChat);

export default router; 
