import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../pages/signupform';
import LoginForm from '../pages/Login';
import auth from '../utils/auth';


const AppNavbar = (props) => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const { authUser } = props


  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Book Den
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {/* if user is logged in show saved books and logout */}
              {authUser && auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to={`/MyProfile/${authUser._id}`}>My Profile</Nav.Link>
                  <Nav.Link as={Link} to={`/Bookshelf/${authUser._id}`}>Bookshelf</Nav.Link>
                  <Nav.Link as={Link} to={`/Favorites/${authUser._id}`}>Favorites</Nav.Link>
                  <Nav.Link as={Link} to={`/Wishlist/${authUser._id}`}>Wishlist</Nav.Link>
                  <Nav.Link as={Link} to={`/AddBook/${authUser._id}`}>Add Book to Library</Nav.Link>
                  <Nav.Link onClick={auth.logout}>Logout</Nav.Link>
                </>
              ) 
              : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
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
    </>
  );
};

export default AppNavbar;
