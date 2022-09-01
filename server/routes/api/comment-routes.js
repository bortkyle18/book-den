const router = require('express').Router()
const { addComment, updateComment, removeComment } = require('../../controllers/comment-controller')


//   /api/comment/:bookId
router.route('/:bookId').post(addComment)

//   /api/comment/:bookId/:commentId
router.route('/:bookId/:commentId').put(updateComment)
router.route('/:bookId/:commentId').delete(removeComment)


module.exports = router;