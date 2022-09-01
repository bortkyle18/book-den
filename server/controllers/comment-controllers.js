const Book = require('../models/Book')
const Comment = require('../models/Comment')


const addComment = async (parent, { params, body }) => {
  try {
    // create new comment
    const newComment = await Comment.create({ ...body })

    // find book and update comments array to include new comment
    const addCommentQuery = await Book.findOneAndUpdate(
      params.bookId,
      { $push: { comments: { ...newComment } } },
      { new: true })
    res.status(200).json({ result: "success", payload: addCommentQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to follow user' });
  }
}

const updateComment = async (parent, { params, body }) => {
  try {
    // find comment and delete comment
    const updateCommentQuery = await Comment.findOneAndUpdate(
      params.commentId,
      { ...body },
      { new: true })
    res.status(200).json({ result: "success", payload: updateCommentQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to follow user' });
  }
}

const removeComment = async (parent, { params, body }) => {
  try {
    // find book and update comments array to include new comment
    const removeCommentQuery = await Comment.findOneAndDelete({ _id: params.commentId })
    res.status(200).json({ result: "success", payload: removeCommentQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to follow user' });
  }
}


module.exports = { 
  addComment,
  updateComment,
  removeComment
}