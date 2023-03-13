const router = require('express').Router();
const postRouter = require('./post.routes');
const userRouter = require('./user.routes');
const commentRouter = require('./comment.routes');
const authRouter = require('./auth.routes');

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);

module.exports = router;