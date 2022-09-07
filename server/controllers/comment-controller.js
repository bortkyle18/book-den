const { Book, Comment } = require("../models")


const addComment = async ({ params, body }, res ) => {
  try {
    // create new comment
    const newComment = await Comment.create({ ...body })

    // find book and update comments array to include new comment
    const addCommentQuery = await Book.findByIdAndUpdate(
      params.bookId,
      { $push: { comments: { ...newComment } } },
      { new: true })
      .select('-__v')
      .populate('comments')
    res.status(200).json({ result: "success", payload: addCommentQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to add comment' });
  }
}

const updateComment = async ({ params, body }, res ) => {
  try {
    // find comment and update comment
    const updateCommentQuery = await Comment.findByIdAndUpdate(
      params.commentId,
      { ...body },
      { new: true })
      .select('-__v')
    res.status(200).json({ result: "success", payload: updateCommentQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to update comment' });
  }
}

const removeComment = async ({ params, body }, res ) => {
  try {
    // find comment and update comments array to remove comment
    const removeCommentQuery = await Comment.findOneAndDelete({ _id: params.commentId })
    res.status(200).json({ result: "success", payload: removeCommentQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to remove comment' });
  }
}


module.exports = { 
  addComment,
  updateComment,
  removeComment
}