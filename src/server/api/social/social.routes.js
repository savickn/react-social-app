import { Router } from 'express';
import * as controller from './social.controller';
const router = new Router();

// Get all Socials
router.route('/socials').get(controller.getSocials);

// Get one Social by cuid
router.route('/socials/:cuid').get(controller.getSocial);

// Add a new Social
router.route('/socials').post(controller.addSocial);

// Cancel a Social by cuid
router.route('/socials/:cuid').delete(controller.cancelSocial);


export default router;
