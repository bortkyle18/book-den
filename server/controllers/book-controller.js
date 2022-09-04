const { Book, User } = require("../models");

const addBook = async ({ params, body }, res) => {
  try {
    console.log(body);
    // create new book
    const newBook = await Book.create({ ...body });
    console.log("newbook", newBook);
    // find user and update library array to include new book
    const addBookQuery = await User.findOneAndUpdate(
      params.userId,
      { $push: { library: { ...newBook } } },
      { new: true }
    )
      .select("-__v")
      .populate("comments");
    console.log("query", addBookQuery);
    res.status(200).json({ result: "success", payload: addBookQuery });
  } catch (err) {
    res.status(400).json({ message: "Unable to add book " + err });
  }
};

const updateBook = async ({ params, body }, res) => {
  try {
    // find book and update book
    const updateBookQuery = await Book.findOneAndUpdate(
      params.bookId,
      { ...body },
      { new: true }
    )
      .select("-__v")
      .populate("comments");
    res.status(200).json({ result: "success", payload: updateBookQuery });
  } catch (err) {
    res.status(400).json({ message: "Unable to update book" });
  }
};

const removeBook = async ({ params, body }, res) => {
  try {
    // find  book and remove  book
    const removeBookQuery = await Book.findOneAndDelete({ _id: params.bookId });
    res.status(200).json({ result: "success", payload: removeBookQuery });
  } catch (err) {
    res.status(400).json({ message: "Unable to delete book" });
  }
};

const getBooks = async ({ params, body }, res) => {
  try {
    console.log("books");
    const books = await Book.find({});
    res.status(200).json({ result: "success", payload: books });
  } catch (error) {
    res.status(400).json({ message: "Unable to get books" });
  }
};

module.exports = {
  addBook,
  updateBook,
  removeBook,
  getBooks,
};
