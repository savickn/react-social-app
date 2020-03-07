
import { Router } from 'express';
import multer from 'multer';
import mkdirp from 'mkdirp';

import * as controller from './profile.controller';
import config from '../../config/environment';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination = path.resolve(config.root, 'src/server/public/Profiles');
    mkdirp(destination, (err) => {
      cb(err, destination);
    });
  },
  filename: function (req, file, cb) {
    console.log('multer upload file --> ', file);
    const strArr = file.originalname.split('.');
    cb(null, strArr[0] + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
const router = new Router();

router.post('/', upload.single('avatar'), controller.createProfile);

export default router;
