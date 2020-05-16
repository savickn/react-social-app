import { Router } from 'express';
import * as controller from './album.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.searchAlbums); 
router.get('/:id', controller.getAlbum); 
router.post('/', controller.createAlbum); 
router.delete('/:id', controller.deleteAlbum); 

export default router;
