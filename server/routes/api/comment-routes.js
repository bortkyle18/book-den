const router = require('express').Router()
const { addComment, updateComment, removeComment } = require('../../controllers/comment-controller')


//   /api/comment/:bookId
router.route('/:bookId').post(addComment)

//   /api/comment/:commentId
router.route('/:commentId').put(updateComment)
router.route('/:commentId').delete(removeComment)


module.exports = router;