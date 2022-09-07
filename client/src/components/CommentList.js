import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';


const CommentList = ({ comments, username }) => {
  //Remove books
  const [ deleteMessage, setDeleteMessage ] = useState({ type: "", msg: "" })
  const handleDeleteComment = async (comment
  ) => {
    console.log(comment)
    const commentId = comment._id
    setDeleteMessage({ type: "", msg: "" })
    const deleteComment = await fetch("../../api/comment/"+commentId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    const deleteCommentResult = await deleteComment.json()
    
    if( deleteCommentResult.result === "success" ){
      window.location.reload()
    } else {
      setDeleteMessage({ type: "danger", msg: "We were unable to delete this comment." })
    }
  };

  console.log(username)


  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">comments</span>
      </div>
      <div className="card-body">
        {comments &&
          comments.map(comment => (
            <p className="pill mb-3" key={comment._id}>
              {comment.commentBody} {'- '}
              <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
                {comment.username}
              </Link>
              <>, {comment.createdAt}</>
              <br/>
              {comment.username === username && (
              <Button
                className="btn-danger"
                onClick={() => handleDeleteComment(comment)}
                >
                  Delete your comment
                </Button>
              )}
            </p>
          ))}
          { deleteMessage.msg.length > 0 && (
            <Alert variant={deleteMessage.type} style={{ marginTop: "2em" }}>
              { deleteMessage.msg }
            </Alert>
          )}
      </div>
    </div>
  );
};

export default CommentList;