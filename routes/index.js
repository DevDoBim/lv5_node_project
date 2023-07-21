const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const postsRouter = require('./posts.routes');
const cmtsRouter = require('./cmts.routes');
const likesRouter = require('./likes.routes');

router.use('/', usersRouter);
router.use('/', postsRouter);
router.use('/', cmtsRouter);
// router.use('/', likesRouter);

module.exports = router;
