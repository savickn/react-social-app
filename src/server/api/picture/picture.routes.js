'use strict';

import { Router } from 'express'
import fileUploadMiddleware from 'express-fileupload';
import multer from 'multer';
import path from 'path';

import * as controller from './picture.controller';
import config from '../../config/environment';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(config.root, 'src/server/public/Profiles'))
  },
  filename: function (req, file, cb) {
    console.log('multer upload file --> ', file);
    const strArr = file.originalname.split('.');
    cb(null, strArr[0] + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
const router = new Router();

router.get('/:id', controller.getPicture);
router.post('/profile', upload.single('avatar'), controller.saveImageToDisk);
router.post('/profile1', upload.single('avatar'), controller.createProfile);

router.post('/', fileUploadMiddleware(), controller.createLocal);
router.delete('/:id', controller.deletePicture);

export default router;


// old
//const multiparty = require('connect-multiparty');
//const multipartyMiddleware = multiparty();