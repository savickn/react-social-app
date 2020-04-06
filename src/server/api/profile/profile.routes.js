
import { Router } from 'express';
import * as controller from './profile.controller';

const router = new Router();

router.post('/', controller.createProfile);
router.get('/:id', controller.fetchProfile);
//router.put('/:id', controller.updateProfile);

export default router;
