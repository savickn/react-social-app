import { Router } from 'express';
import * as controller from './comment.controller';
const router = new Router();

router.route('/comments').get(controller.getComments);
router.route('/comments/:id').get(controller.getComment);
router.route('/comments').post(controller.addComment);
router.route('/comments/:id').delete(controller.deleteComment);

export default router;
