const router = require('express').Router()
const { getAllBooks, getBookById, addBook, updateBook, updateBookById, removeBook, removeBookById } = require('../../controllers/book-controller')


//   /api/book/:userId
router.route('/:userId').post(addBook)

//   /api/book
router.route('/').get(getAllBooks)
//   /api/book/:bookId
router.route('/:bookId').get(getBookById)
router.route('/:bookId').put(updateBookById)
router.route('/:bookId').delete(removeBookById)

//   /api/book/:userId/:bookId
router.route('/:userId/:bookId').put(updateBook)
router.route('/:userId/:bookId').delete(removeBook)


module.exports = router;