
import { Router } from 'express';
import * as controller from './event.controller';

const router = new Router();

router.get('/', controller.searchEvents);
router.get('/:id', controller.getEvent);
router.post('/', controller.addEvent);
router.put('/:id', controller.updateEvent);
router.delete('/:id', controller.deleteEvent);

export default router;
