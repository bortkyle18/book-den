const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const bookSchema = new Schema(
  {
    bookTitle: {
      type: String,
      required: true
    },
    bookCover: {
      type: String
    },
    bookReview: {
      type: String,
      minlength: 5,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    likes: {
      type: Number
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

bookSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});


const Book = model('Book', bookSchema);


module.exports = Book;
