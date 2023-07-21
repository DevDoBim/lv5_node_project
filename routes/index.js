const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const postsRouter = require('./posts.routes');
const cmtsRouter = require('./cmts.routes');
const likesRouter = require('./likes.routes');

router.use('/', usersRouter);
// router.use('/posts', postsRouter);
// router.use('/cmts', cmtsRouter);
// router.use('/likes', likesRouter);

module.exports = router;
