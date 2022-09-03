const router = require('express').Router()
const { getAllBooks, getBookById, addBook, updateBook, removeBook } = require('../../controllers/book-controller')


//   /api/book/:userId
router.route('/:userId').post(addBook)

//   /api/book/:bookId
router.route('/:bookId').get(getAllBooks)
router.route('/:bookId').get(getBookById)

//   /api/book/:userId/:bookId
router.route('/:userId/:bookId').put(updateBook)
router.route('/:userId/:bookId').delete(removeBook)


module.exports = router;