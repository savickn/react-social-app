import {Router} from 'express';
import * as controller from './test.controller';

const router = new Router();

router.get('/', controller.getData);

export default router;
