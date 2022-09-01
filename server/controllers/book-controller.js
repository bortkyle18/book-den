const { Book, User } = require("../models")


const addBook = async ({ params, body }, res ) => {
  try {
    // create new book
    const newBook = await Book.create({ ...body })

    // find user and update library array to include new book
    const addBookQuery = await User.findOneAndUpdate(
      params.userId,
      { $push: { library: { ...newBook } } },
      { new: true })
      .select('-__v')
      .populate('comments')
    res.status(200).json({ result: "success", payload: addBookQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to add book' });
  }
}

const updateBook = async ({ params, body }, res ) => {
  try {
    // find book and update book
    const updateBookQuery = await Book.findOneAndUpdate(
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


module.exports = { 
  addBook,
  updateBook,
  removeBook
}