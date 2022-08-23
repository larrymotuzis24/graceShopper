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
  const { auth, cart, logout, match, wishList } = props;
  const view = match.params.view;
  return (
    <Navbar bg="white" expand="lg" className="sticky-top mb-3">
      <Container
        style={{
          display: 'flex',
          flex: 'row nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
        }}
        className="fixed-top"
      >
        <Navbar.Brand href="/">Source Code Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ flexGrow: '0' }}>
          <Nav className="me-auto" style={{}}>
            <Nav.Link
              href="#books"
              className={view === 'books' ? 'selected' : ''}
            >
              Books
            </Nav.Link>
            <Nav.Link href="">Search</Nav.Link>
            {auth.id ? (
              <div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Account
                      </a>
                      <ul className="dropdown-menu dropdown-menu">
                        <li>
                          <a
                            href="#user"
                            className={
                              view === 'user'
                                ? 'active dropdown-item'
                                : 'dropdown-item'
                            }
                          >
                            {' '}
                            Account Details{' '}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#wishList"
                            className={
                              view === 'wishList'
                                ? 'active dropdown-item'
                                : 'dropdown-item'
                            }
                          >
                            {' '}
                            Wishlist({wishList.length}){' '}
                          </a>
                        </li>
                        <li>
                          <a
                            href=""
                            className={
                              view === 'orderHistory'
                                ? 'active dropdown-item'
                                : 'dropdown-item'
                            }
                          >
                            {' '}
                            Order History{' '}
                          </a>
                        </li>
                        {auth.isAdmin ? (
                          <li>
                            <hr class="dropdown-divider" />
                            <a
                              href="#adminPriveldges"
                              className={
                                view === 'adminPriveldges'
                                  ? 'active dropdown-item'
                                  : 'dropdown-item'
                              }
                            >
                              {' '}
                              Admin Console{' '}
                            </a>
                          </li>
                        ) : null}
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            href="#"
                            className="dropdown-item"
                            onClick={logout}
                          >
                            {' '}
                            Logout{' '}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Nav.Link
                href="#signIn"
                className={view === 'signIn' ? 'selected' : ''}
              >
                {' '}
                Login{' '}
              </Nav.Link>
            )}

            <Nav.Link
              href="#cart"
              className={view === 'cart' ? 'selected' : ''}
            >
              {auth.id
                ? `Cart (${cart.isCart ? cart.lineItems.length : 0})`
                : !auth.id && localStorage.getItem('lineItem')
                ? `Cart (${
                    JSON.parse(localStorage.getItem('lineItem')).length
                  })`
                : 'Cart (0)'}
            </Nav.Link>
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
