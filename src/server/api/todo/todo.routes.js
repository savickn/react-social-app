
import { Router } from 'express';
import * as controller from './todo.controller';

const router = new Router();

router.get('/', controller.getTodos);
router.post('/', controller.addTodo);
router.patch('/:id', controller.updateTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

export default router;
