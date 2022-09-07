const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const bookSchema = new Schema(
  {
    title: {
        type: String,
    },
    authors: [
      {
        type: String,
      },
    ],
    libraryCategory: {
      type: String,
      // libraryCategory is either bookshelf, favorites, or wishlist
      enum: ['Bookshelf', 'Favorites', 'Wishlist'],
      required: true
    },
    cover: {
      type: String
    },
    review: [
      {
        type: String,
        minlength: 5
      }
    ],
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
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
