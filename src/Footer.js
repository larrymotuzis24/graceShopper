import React from 'react';
import { connect } from 'react-redux';

const Footer = () => {
  return (
    <div className="bg-dark">
      <footer className="py-3 mt-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2">
              Books
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              Shipping & Orders
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              Account
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              Instagram
            </a>
          </li>
        </ul>
        <p className="text-center text-white">© 2022 Source Code Books, Inc</p>
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
