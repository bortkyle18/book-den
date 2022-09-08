import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { Card, Col } from "react-bootstrap";
import auth from "../utils/auth";

const SingleBook = (props) => {
  const [authUser, setAuthUser] = useState(null);

  const checkForValidUser = async () => {
    const authCheck = await fetch("../../api/user/lookup");
    const checkAuthResult = await authCheck.json();
    const getUserData = await fetch(
      "../../api/user/" + checkAuthResult.payload._id
    );
    const userData = await getUserData.json();
    if (userData && userData.result === "success") {
      setAuthUser(userData.payload);
    }
  };

  useEffect(() => {
    checkForValidUser();
  }, []);

  const { bookId: bookParam } = useParams();
  const [bookData, setBookData] = useState("");

  const getBookData = async (bookParam) => {
    const response = await fetch("../../api/book/" + bookParam);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setBookData(parsedResponse.payload);
    }
  };

  useEffect(() => {
    getBookData(bookParam);
  }, [bookParam]);

  if (bookData && authUser) {
    return (
      <Col key={bookData._id}>
        <br />
        <Card border="dark">
          {bookData.cover ? (
            <Card.Img
              src={bookData.cover}
              alt={`The cover for ${bookData.title}`}
              variant="top"
            />
          ) : null}
          <Card.Body>
            <Link to={`/book/${bookData.username}/${bookData._id}`}>
              <Card.Title>{bookData.title}</Card.Title>
            </Link>
            <p className="small">Authors: {bookData.authors}</p>
            <p>
              <>Posted By: </>
              <Link to={`/profile/${bookData.username}`}>
                {bookData.username}
              </Link>{" "}
              on {bookData.createdAt}
            </p>
            <Card.Text>{bookData.review}</Card.Text>
            <br />
            <br />
            <Card.Text>
              To read or leave comments on this review, click the title of the
              book above.
            </Card.Text>
          </Card.Body>
          <br />
          <br />
          <br />
          <br />
          <div className="mb-3">
            {bookData.commentCount > 0 && (
              <CommentList
                comments={bookData.comments}
                username={authUser.username}
              />
            )}
            {auth.loggedIn() && (
              <CommentForm bookId={bookData._id} username={authUser.username} />
            )}
          </div>
        </Card>
      </Col>
    );
  }
};

export default SingleBook;
