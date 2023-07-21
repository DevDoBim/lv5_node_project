const express = require('express');
const authMiddleware = require('../middleware/auth-Middleware');
const router = express.Router();

const LikeController = require('../controllers/like.controllers');
const likeController = new LikeController();

router.put('/posts/:postId/like', authMiddleware, likeController.updateLike);
router.get('/like', authMiddleware, likeController.getLikes);

module.exports = router;
