const router = require('express').Router();
const bookRoutes = require('./book-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');


router.use('/book', bookRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);


module.exports = router;