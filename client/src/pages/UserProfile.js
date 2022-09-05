import "./UserProfile.css";
import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';


const UserProfile = (props) => {
  console.log(props)

  // Search to add books
  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.bookId,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || ['No author to display'],
        cover: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };


  // My Books
  const [userBooks, setUserBooks] = useState([]);
  const userId = props.authUser._id

  const displayBooks = async (userId) => {
    try {
      console.log(userId)
      const response =  await fetch(`api/user/`+userId)
      const parsedResponse = await response.json()
      if( parsedResponse.result === "success" ){
        console.log(parsedResponse)
        setUserBooks(parsedResponse.payload.library)
      }

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect( () => {
    displayBooks(userId);
  }, [userId])


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
          <span style={{ fontWeight: "bold" }}>Username:</span> Hoffman
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>User email:</span>
          Tomhoffmanco@gmail.com
        </p>
        <br />

        <div className="container mt-4">
          <h1 className="display-4 text-center">
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
            <Row xs={1} md={2} className="g-4">
              {userBooks.map((book) => {
                return (
                  <Col>
                  <Card key={book._id} border="dark">
                    {book.cover ? (
                      <Card.Img
                        src={book.cover}
                        alt={`The cover for ${book.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className="small">Authors: {book.authors}</p>
                      <Card.Text>{book.review}</Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                );
              })}
            </Row>
            Add 
            <span className="text-primary"> Book</span> To Library
          </h1>
          <Form onSubmit={handleFormSubmit}>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
          </Form>
        </div>

        <br />
        <br />
        <br />
        <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.cover ? (
                  <Card.Img
                    src={book.cover}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedId) => savedId === book.bookId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some((savedId) => savedId === book.bookId)
                        ? 'Book Already Saved!'
                        : 'Save This Book!'}
                    </Button>
                  )} */}
                </Card.Body>
              </Card>
            );
          })}
      </Container>
      </div>
  );
};


export default UserProfile;