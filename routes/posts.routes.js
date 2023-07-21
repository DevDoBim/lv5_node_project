const express = require('express');
const authMiddleware = require('../middleware/auth-Middleware');
const router = express.Router();

const PostController = require('../controllers/posts.controllers');
const postController = new PostController();

router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts', postController.getPost);
router.put('/posts/:postId', authMiddleware, postController.updatePost);
router.delete('/posts/:postId', authMiddleware, postController.deletePost);

module.exports = router;
