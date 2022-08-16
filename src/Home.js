import React from "react";
import { connect } from "react-redux";

const Home = ({ books, auth }) => {
  return (
    <div id="home-page">
      {auth.id ? (
        <h2>
          Welcome, {auth.firstName} {auth.lastName}
        </h2>
      ) : null}
      <h1 id="homeTitle"> GraceShopper Bookstore Home </h1>
      <div>
        <h2> Top Rated </h2>
      </div>
      <div id="topBooksDiv">
        {books.map((book) => {
          return (
            <div key={book.id} className="homeBookDiv">
              <h3> {book.title}</h3>
              <p> {book.author}</p>
              <p> {book.rating} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default connect((state) => state)(Home);
