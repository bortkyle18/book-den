import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const CommentForm = ({ bookId, username }) => {
  const [commentBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [ saveMessage, setSaveMessage ] = useState({ type: "", msg: "" })

  const handleSaveComment = async(commentBody, bookId, username) => {
    const commentToSave = {
      commentBody: commentBody,
      username: username
    }

    setSaveMessage({ type: "", msg: "" })
    const saveBook = await fetch("../../api/comment/"+bookId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentToSave)
    })
    const saveBookResult = await saveBook.json()
    
    if( saveBookResult.result === "success" ){
      window.location.reload()
    } else {
      setSaveMessage({ type: "danger", msg: "We were unable to save this comment" })
    }
  }

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // add review to database
      await handleSaveComment(commentBody, bookId, username);
  
      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280}`}
      >
        Character Count: {characterCount}/280
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a comment to this book/comment here."
          value={commentBody}
          className="form-input col-12 col-md-12"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-5" type="submit">
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

export default CommentForm;