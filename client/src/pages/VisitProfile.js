import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Col, Card, Row } from "react-bootstrap";

const UserProfile = () => {
  const { username: userParam } = useParams();
  const [userData, setUserData] = useState("");

  const getUserData = async (userParam) => {
    const response = await fetch("../api/user/username/" + userParam);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setUserData(parsedResponse.payload);
    }
  };

  useEffect(() => {
    getUserData(userParam);
  }, [userParam]);

  // Get profile books
  const userBooks = userData.library;

  // End of get my books

  if (userData) {
    return (
      <div>
        <br />
        <h1>
          <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
          {userData.username}
        </h1>
        <br />
        <h1 align="center">Wishlist</h1>
        <Row xs={1} md={3} className="g-4 bookCard">
          {
            // eslint-disable-next-line
            userBooks.map((book) => {
              if (book.libraryCategory === "Wishlist") {
                return (
                  <Col key={book._id}>
                    <Card border="dark">
                      {book.cover ? (
                        <Card.Img
                          src={book.cover}
                          alt={`The cover for ${book.title}`}
                          variant="top"
                        />
                      ) : null}
                      <Card.Body>
                        <Link to={`/book/${book.username}/${book._id}`}>
                          <Card.Title>{book.title}</Card.Title>
                        </Link>
                        <p className="small">Authors: {book.authors}</p>
                        <p className="small">
                          Posted By: {book.username} on {book.createdAt}
                        </p>
                        <Card.Text>{book.review}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            })
          }
        </Row>
        <h1 align="center">Favorites</h1>
        <Row xs={1} md={3} className="g-4 bookCard">
          {
            // eslint-disable-next-line
            userBooks.map((book) => {
              if (book.libraryCategory === "Favorites") {
                return (
                  <Col key={book._id}>
                    <Card border="dark">
                      {book.cover ? (
                        <Card.Img
                          src={book.cover}
                          alt={`The cover for ${book.title}`}
                          variant="top"
                        />
                      ) : null}
                      <Card.Body>
                        <Link to={`/book/${book.username}/${book._id}`}>
                          <Card.Title>{book.title}</Card.Title>
                        </Link>
                        <p className="small">Authors: {book.authors}</p>
                        <p className="small">
                          Posted By: {book.username} on {book.createdAt}
                        </p>
                        <Card.Text>{book.review}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            })
          }
        </Row>
        <h1 align="center">Bookshelf</h1>
        <Row xs={1} md={3} className="g-4 bookCard">
          {
            // eslint-disable-next-line
            userBooks.map((book) => {
              if (book.libraryCategory === "Bookshelf") {
                return (
                  <Col key={book._id}>
                    <Card border="dark">
                      {book.cover ? (
                        <Card.Img
                          src={book.cover}
                          alt={`The cover for ${book.title}`}
                          variant="top"
                        />
                      ) : null}
                      <Card.Body>
                        <Link to={`/book/${book.username}/${book._id}`}>
                          <Card.Title>{book.title}</Card.Title>
                        </Link>
                        <p className="small">Authors: {book.authors}</p>
                        <p className="small">
                          Posted By: {book.username} on {book.createdAt}
                        </p>
                        <Card.Text>{book.review}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            })
          }
        </Row>
        <br />
        <br />
      </div>
    );
  }
};

export default UserProfile;
