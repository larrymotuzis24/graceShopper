import React from 'react';
import { connect } from 'react-redux';

const Footer = () => {
  return (
    <div class="container">
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Books
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Shipping & Orders
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              About
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Account
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Instagram
            </a>
          </li>
        </ul>
        <p class="text-center text-muted">© 2022 Source Code Books, Inc</p>
      </footer>
    </div>
  );
};

const mapDispatch = (dispatch, { history }) => {
  return {};
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(Footer);
