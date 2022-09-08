import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Row,
} from "react-bootstrap";

const AddToLibrary = (props) => {
  const { userId: userParam } = useParams();
  const [userData, setUserData] = useState("");

  const getUserData = async (userParam) => {
    const response = await fetch("../api/user/" + userParam);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setUserData(parsedResponse.payload);
    }
  };

  useEffect(() => {
    getUserData(userParam);
  }, [userParam]);

  // Search to add books
  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchInput, setSearchInput] = useState("");

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
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.bookId,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || ["No author to display"],
        cover: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };
  // End of search to add books

  // Save book to library
  const [saveMessage, setSaveMessage] = useState({ type: "", msg: "" });

  const handleSaveBookToBookshelf = async (book) => {
    const bookToSave = {
      title: book.title,
      cover: book.cover,
      authors: book.authors,
      libraryCategory: "Bookshelf",
      username: userData.username,
    };

    setSaveMessage({ type: "", msg: "" });
    const saveBook = await fetch("../api/book/" + userParam, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookToSave),
    });
    const saveBookResult = await saveBook.json();

    if (saveBookResult.result === "success") {
      window.location.reload();
    } else {
      setSaveMessage({
        type: "danger",
        msg: "We were unable to save this book to your Bookshelf",
      });
    }
  };

  const handleSaveBookToFavorites = async (book) => {
    const bookToSave = {
      title: book.title,
      cover: book.cover,
      authors: book.authors,
      libraryCategory: "Favorites",
      username: userData.username,
    };

    setSaveMessage({ type: "", msg: "" });
    const saveBook = await fetch("../api/book/" + userParam, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookToSave),
    });
    const saveBookResult = await saveBook.json();

    if (saveBookResult.result === "success") {
      window.location.reload();
    } else {
      setSaveMessage({
        type: "danger",
        msg: "We were unable to save this book to your Favorites",
      });
    }
  };

  const handleSaveBookToWishlist = async (book) => {
    const bookToSave = {
      title: book.title,
      cover: book.cover,
      authors: book.authors,
      libraryCategory: "Wishlist",
      username: userData.username,
    };

    setSaveMessage({ type: "", msg: "" });
    const saveBook = await fetch("../api/book/" + userParam, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookToSave),
    });
    const saveBookResult = await saveBook.json();

    if (saveBookResult.result === "success") {
      window.location.reload();
    } else {
      setSaveMessage({
        type: "danger",
        msg: "We were unable to save this book to your Wishlist",
      });
    }
  };
  // End of save book to library

  if (userData) {
    return (
      <div>
        <br />
        <h4>
          Add <span className="text-success"> Book</span> To Wishlist
        </h4>
        <Form onSubmit={handleFormSubmit}>
          <Col xs={12} md={8} flex>
            <Form.Control
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              size="lg"
              placeholder="Search for a book"
            />
            <Button type="submit" variant="success" size="lg">
              Submit Search
            </Button>
          </Col>
        </Form>
        <Container>
          <h4>
            {searchedBooks.length
              ? `Viewing ${searchedBooks.length} results:`
              : "Search for a book to begin"}
          </h4>
          <Row xs={1} md={4} className="g-4">
            {searchedBooks.map((book) => {
              return (
                <Card key={book.bookId} border="dark" className="search">
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
                    <div className="text-center">
                      <Button
                        className="btn-block btn-info"
                        onClick={() => handleSaveBookToBookshelf(book)}
                      >
                        Save to Bookshelf
                      </Button>
                      <Button
                        className="btn-block btn-info"
                        onClick={() => handleSaveBookToFavorites(book)}
                      >
                        Save to Favorites
                      </Button>
                      <Button
                        className="btn-block btn-info"
                        onClick={() => handleSaveBookToWishlist(book)}
                      >
                        Save to Wishlist
                      </Button>
                      {saveMessage.msg.length > 0 && (
                        <Alert
                          variant={saveMessage.type}
                          style={{ marginTop: "2em" }}
                        >
                          {saveMessage.msg}
                        </Alert>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
};

export default AddToLibrary;
