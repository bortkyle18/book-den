import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Alert,
} from "react-bootstrap";

const Bookshelf = (props) => {
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
    const saveBook = await fetch("../api/book/" + userId, {
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
    const saveBook = await fetch("../api/book/" + userId, {
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
  // End of save book to library

  // Get my books
  const userBooks = userData.library;
  const userId = userData._id;
  // End of get my books

  //Remove books
  const [deleteMessage, setDeleteMessage] = useState({ type: "", msg: "" });
  const handleDeleteBook = async (book) => {
    const bookId = book._id;
    setDeleteMessage({ type: "", msg: "" });
    const deleteBook = await fetch("../api/book/" + bookId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const deleteBookResult = await deleteBook.json();

    if (deleteBookResult.result === "success") {
      window.location.reload();
    } else {
      setDeleteMessage({
        type: "danger",
        msg: "We were unable to deletethis book to your Bookshelf",
      });
    }
  };

  if (userData) {
    return (
      <div>
        <br />
        <h1>
          <span style={{ fontWeight: "bold" }}>
            {userData.username}'s Bookshelf
          </span>
        </h1>
        <br />
        <h4>
          Add <span className="text-success"> Book</span> To Bookshelf
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
                        className="btn-block btn-success"
                        onClick={() => handleSaveBookToBookshelf(book)}
                      >
                        Save to Bookshelf
                      </Button>
                      <Button
                        className="btn-block btn-success"
                        onClick={() => handleSaveBookToFavorites(book)}
                      >
                        Save to Bookshelf
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
                        <Link to={`/MyBook/${book._id}`}>{book.title}</Link>
                        <p className="small">Authors: {book.authors}</p>
                        <p>
                          <>Posted By: You - </>
                          <Link to={`/profile/${book.username}`}>
                            {book.username}
                          </Link>{" "}
                          on {book.createdAt}
                        </p>
                        <Card.Text>{book.review}</Card.Text>
                        <br />
                        <br />
                        <Card.Text>
                          To write or rewrite a review, click the title of the
                          book above.
                        </Card.Text>
                        <div className="text-center">
                          <Button
                            className="btn-block btn-danger"
                            onClick={() => handleDeleteBook(book)}
                          >
                            Delete this Book!
                          </Button>
                          {deleteMessage.msg.length > 0 && (
                            <Alert
                              variant={deleteMessage.type}
                              style={{ marginTop: "2em" }}
                            >
                              {deleteMessage.msg}
                            </Alert>
                          )}
                        </div>
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
        <br />
        <h1 align="center">Other Books on Bookshelf</h1>
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
                        <Link to={`/MyBook/${book._id}`}>{book.title}</Link>
                        <p className="small">Authors: {book.authors}</p>
                        <p>
                          <>Posted By: You - </>
                          <Link to={`/profile/${book.username}`}>
                            {book.username}
                          </Link>{" "}
                          on {book.createdAt}
                        </p>
                        <Card.Text>{book.review}</Card.Text>
                        <br />
                        <br />
                        <Card.Text>
                          To write or rewrite a review, click the title of the
                          book above.
                        </Card.Text>
                        <div className="text-center">
                          <Button
                            className="btn-block btn-danger"
                            onClick={() => handleDeleteBook(book)}
                          >
                            Delete this Book!
                          </Button>
                          {deleteMessage.msg.length > 0 && (
                            <Alert
                              variant={deleteMessage.type}
                              style={{ marginTop: "2em" }}
                            >
                              {deleteMessage.msg}
                            </Alert>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            })
          }
        </Row>
      </div>
    );
  }
};

export default Bookshelf;
