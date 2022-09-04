import React, { useState, useEffect } from 'react';
import { Nav, Tab, Modal, Button, Card, Col, Row } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Stack';
import SignUpForm from './signupform';
import LoginForm from './Login';
import { allBooks } from '../utils/API';

const Home = (props) => {
  const [allBooks, setAllBooks] = useState([]);

  const displayBooks = async () => {
    try {
      const response =  await fetch('api/book')
      const parsedResponse = await response.json()
      if( parsedResponse.result === "success" ){
        setAllBooks(parsedResponse.payload)
        console.log(allBooks)
      }

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect( () => {
    displayBooks();
  }, [])

  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <Container className='home'>
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Welcome to Book Den</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary" onClick={() => setShowModal(true)}>Login</Button>
      </Card.Body>
      
    </Card>
    <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </Container>

      <Container>
      <h2>
        {allBooks.length
          ? `Viewing ${allBooks.length} results:`
          : 'Search for a book to begin'}
      </h2>
      <Row xs={1} md={2} className="g-4">
        {allBooks.map((book) => {
          return (
            <Col>
            <Card key={book._id} border="dark">
              {book.bookCover ? (
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
            </Col>
          );
        })}
      </Row>
      </Container>
    </>
  )
}

export default Home