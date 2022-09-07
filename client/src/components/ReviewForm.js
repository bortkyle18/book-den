import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';


const ReviewForm = (props) => {
  const [reviewText, setReviewText] = useState('');
  const [ saveMessage, setSaveMessage ] = useState({ type: "", msg: "" })
  const bookId = props.bookId

  const handleSaveReview = async(reviewText, bookId) => {
    const reviewToSave = {
      review: reviewText
    }

    setSaveMessage({ type: "", msg: "" })
    const saveBook = await fetch("/api/book/"+bookId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewToSave)
    })
    const saveBookResult = await saveBook.json()
    
    if( saveBookResult.result === "success" ){
      window.location.reload()
    } else {
      setSaveMessage({ type: "danger", msg: "We were unable to save this book to your Bookshelf" })
    }
  }

  const handleChange = event => {
    setReviewText(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add review to database
      await handleSaveReview(reviewText, bookId);
  
      // clear form value
      setReviewText('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <p>Type your review to this book here. If you've already made a review for this book but would 
        <br />
        like to change it, submiting a new review will replace the review you have now!</p>
        <textarea
          placeholder="Enter review here"
          value={reviewText}
          className="form-input col-12 col-md-12"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
        { saveMessage.msg.length > 0 && (
          <Alert variant={saveMessage.type} style={{ marginTop: "2em" }}>
            { saveMessage.msg }
          </Alert>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;