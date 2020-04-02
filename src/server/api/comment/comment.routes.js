import { Router } from 'express';
import * as controller from './comment.controller';
const router = new Router();

router.get('/', controller.searchComments);
router.get('/:id', controller.getComment);
router.post('/', controller.createComment);
router.delete('/:id', controller.deleteComment);

export default router;
