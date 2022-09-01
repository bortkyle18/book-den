const router = require('express').Router()
const { addBook, updateBook, removeBook } = require('../../controllers/book-controller')


//   /api/book/:userId
router.route('/:userId').post(addBook)

//   /api/book/:userId/:bookId
router.route('/:userId/:bookId').put(updateBook)
router.route('/:userId/:bookId').delete(removeBook)


module.exports = router;