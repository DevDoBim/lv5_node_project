const express = require('express');
const authMiddleware = require('../middleware/auth-Middleware');
const router = express.Router();

const CmtController = require('../controllers/cmts.controllers');
const cmtController = new CmtController();

router.post('/cmts/:postId', authMiddleware, cmtController.createComment);
router.get('/cmts/:postId', cmtController.getComment);
router.put('/cmts/:postId/:commentId', authMiddleware, cmtController.updateComment);
router.delete('/cmts/:postId/:commentId', authMiddleware, cmtController.deleteComment);

module.exports = router;
