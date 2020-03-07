import { Router } from 'express';
import * as controller from './post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(controller.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(controller.getPost);

// Add a new Post
router.route('/posts').post(controller.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(controller.deletePost);

export default router;
