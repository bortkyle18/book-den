const router = require('express').Router()
const { addBook, updateBook, removeBook } = require('../../controllers/book-controller')


//   /api/book/:bookId
router.route('/:userId').post(addBook)

//   /api/comment/:categoryId
router.route('/:userId/:bookId').put(updateBook)
router.route('/:userId/:bookId').delete(removeBook)


module.exports = router;