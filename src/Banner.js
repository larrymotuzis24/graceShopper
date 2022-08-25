import React, { Component } from 'react';
import { connect } from 'react-redux';

function Banner() {
  return (
    <div
      className="w-100 py-1 px-3 d-flex justify-content-end align-items-center"
      style={{ backgroundColor: '#DFFC21' }}
    >
      <p className="text-dark p-0 my-0 mx-auto p-absolute">
        Free shipping on USA orders over $50
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
    </div>
  );
}

export default Banner;
