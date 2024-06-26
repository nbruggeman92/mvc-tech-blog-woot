const router = require('express').Router();

const userRoutes = require('./userRoutes');

const postRoutes= require('./postRoutes')

const commentsRoutes=require('./commentsRoutes')

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comments',commentsRoutes);

module.exports = router;