import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { Card, Col, Row } from "react-bootstrap";
import auth from "../utils/auth";

const UserSingleBook = (props) => {
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
    const response = await fetch("../api/book/" + bookParam);
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
      <Col>
      <br />
        <Row key={bookData._id} xs={2} md={2} className="g-4">
          <Card border="dark" className="singleBook">
            {bookData.cover ? (
              <Card.Img
                src={bookData.cover}
                alt={`The cover for ${bookData.title}`}
                variant="top"
              />
            ) : null}
          </Card>
          <Card className="singleBook">
            <Card.Body>
              <h1>{bookData.title}</h1>
              <h5>Authors: {bookData.authors}</h5>
              <p>
                <>Posted By: </>
                <Link to={`/profile/${bookData.username}`}>
                  {bookData.username}
                </Link>{" "}
                on {bookData.createdAt}
              </p>
              <Card.Text>{bookData.review}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <br />
        <Card>
          <div className="mb-3 text-center">
            <br/>
            {<ReviewForm bookId={bookData._id} />}
          </div>
        </Card>
        <br />
        <br />
        <Card>
          <div className="mb-3 text-center">
            <br/>
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
        <br/>
        <br/>
      </Col>
    );
  }
};

export default UserSingleBook;
