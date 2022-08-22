import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from './SignIn';
import { logout } from './store';
import SearchBar from './SearchBar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = (props) => {
  const { auth, cart, logout, match } = props;
  const view = match.params.view;
  return (
    <Navbar bg="white" expand="lg" className="sticky-top">
      <Container
        style={{
          display: 'flex',
          flex: 'row nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
        }}
        class="fixed-top"
      >
        <Navbar.Brand href="/">Source Code Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ flexGrow: '0' }}>
          <Nav className="me-auto" style={{}}>
            <Nav.Link href="#books">Books</Nav.Link>
            <Nav.Link href="">Search</Nav.Link>
            {auth.id ? (
              <Nav.Link
                href="#user"
                className={view === 'user' ? 'selected' : ''}
              >
                {' '}
                Account{' '}
              </Nav.Link>
            ) : (
              <Nav.Link
                href="#signIn"
                className={view === 'signIn' ? 'selected' : ''}
              >
                {' '}
                Login{' '}
              </Nav.Link>
            )}
            {auth.id ? (
              <Nav.Link onClick={logout}>
                <Link href="#">Log Out</Link>
              </Nav.Link>
            ) : null}
            <Nav.Link href="#wishlist">Wishlist</Nav.Link>
            <Nav.Link href="#cart">Cart ({cart.lineItems.length})</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapDispatch = (dispatch, { history }) => {
  return {
    logout: () => dispatch(logout(history)),
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(NavBar);
