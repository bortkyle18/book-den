import "./UserProfile.css";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Col,
  Card,
  Row
} from 'react-bootstrap';


const UserProfile = () => {
  const { username: userParam } = useParams();
  const [ userData, setUserData ] = useState('')
  
  const getUserData = async(userParam) => {
    const response = await fetch("../api/user/username/"+userParam)
    const parsedResponse = await response.json()
    if( parsedResponse && parsedResponse.result === "success" ){
      setUserData(parsedResponse.payload)
    }
  }

  useEffect(() => {
    getUserData(userParam);
  }, [userParam])


  // Get profile books
  const userBooks = userData.library

  // End of get my books


  if (userData) {
    return (
        <div>
          <input
            type="file"
            id="image_input"
            accept="image/png, image/jpg"
          ></input>
          <div id="display_image"></div>
          <br />

          <p>
            <span style={{ fontWeight: "bold" }}>Username:</span> {userData.username}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>User email:</span>
            {userData.email}
          </p>
          <br />

          <div className="container mt-4">
            <div className="display-4 text-center">
              <i className="fas fa-book-open text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-book"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
              </i>{" "}
              Wishlist
              <Row xs={1} md={2} className="g-4">
                {// eslint-disable-next-line
                userBooks.map((book) => {
                  if (book.libraryCategory === "Wishlist") {
                    return (
                      <Col key={book._id} >
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
                          <p className="small">Posted By: {book.username} on {book.createdAt}</p>
                          <Card.Text>{book.review}</Card.Text>
                        </Card.Body>
                      </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
              Favorites
              <Row xs={1} md={2} className="g-4">
                {// eslint-disable-next-line
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
                          <p className="small">Posted By: {book.username} on {book.createdAt}</p>
                          <Card.Text>{book.review}</Card.Text>
                        </Card.Body>
                      </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
              Bookshelf
              <Row xs={1} md={2} className="g-4">
                {// eslint-disable-next-line
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
                          <p className="small">Posted By: {book.username} on {book.createdAt}</p>
                          <Card.Text>{book.review}</Card.Text>
                        </Card.Body>
                      </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
            </div>
          </div>
        </div>
    );
  };
};


export default UserProfile;