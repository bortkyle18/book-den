const { Book, User } = require("../models")


const getAllBooks = async (req, res) => {
  try {
    const getAllBooksQuery = await Book.find({})
    .select('-__v')
    .populate('comments')
    res.status(200).json({ result: "success", payload: getAllBooksQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to find books' });
  }
}

const getBookById = async (req, res) => {
  try {
    const getBookByIdQuery = await Book.findById(req.params.bookId)
      .select('-__v')
      .populate('comments')
    res.status(200).json({ result: "success", payload: getBookByIdQuery })
  } catch(err) {
    res.status(400).json({ result: "fail", message: 'Unable to find book' })
  }
}

const addBook = async ({ params, body }, res ) => {
  try {
    // create new book
    const newBook = await Book.create({ ...body })

    // find user and update library array to include new book
    const addBookQuery = await User.findByIdAndUpdate(
      params.userId,
      { $push: { library: { ...newBook } } },
      { new: true })
      .select('-__v')
      .populate('library')
    res.status(200).json({ result: "success", payload: addBookQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to add book' });
  }
}

const updateBook = async ({ params, body }, res ) => {
  try {
    // find book and update book
    const updateBookQuery = await Book.findByIdAndUpdate(
      params.bookId,
      { ...body },
      { new: true })
      .select('-__v')
      .populate('comments')
    res.status(200).json({ result: "success", payload: updateBookQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to update book' });
  }
}

const updateBookById = async ({ params, body }, res ) => {
  try {
    // find book and update book
    const updateBookQuery = await Book.findByIdAndUpdate(
      params.bookId,
      { ...body },
      { new: true })
      .select('-__v')
      .populate('comments')
    res.status(200).json({ result: "success", payload: updateBookQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to update book' });
  }
}

const removeBook = async ({ params, body }, res ) => {
  try {
    // find  book and remove  book
    const removeBookQuery = await Book.findOneAndDelete({ _id: params.bookId })
    res.status(200).json({ result: "success", payload: removeBookQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to delete book' });
  }
}

const removeBookById = async ({ params, body }, res ) => {
  try {
    // find  book and remove  book
    const removeBookByIdQuery = await Book.findOneAndDelete({ _id: params.bookId })
    res.status(200).json({ result: "success", payload: removeBookByIdQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to delete book' });
  }
}


module.exports = { 
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  updateBookById,
  removeBook,
  removeBookById
}