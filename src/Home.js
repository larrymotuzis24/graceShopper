import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeaturedCarousel from './FeaturedCarousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import StarRatingDisplay from './StarRatingDisplay';

const Home = ({ books, auth }) => {
  const topBooks = books.filter((book) => (book.rating = 5));
  return (
    <Container id="home-page">
      <FeaturedCarousel />
      <h2 className="display-4 my-4">Top Rated Books</h2>
      <div className="row row-cols-2 row-cols-lg-4">
        {topBooks.map((book) => {
          return (
            <div className="col">
              <div className="card border-0 mb-5">
                <Link
                  id={book.id}
                  to={`books/${book.id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={book.imageUrl}
                    style={{
                      height: '400px',
                      objectFit: 'contain',
                      backgroundColor: 'black',
                      padding: '2rem',
                    }}
                    className="rounded-2 mb-2 card-img-top"
                  />
                  <div className="card-body p-0">
                    <p className="my-0 text-black">{book.title}</p>
                    <p className="my-0 text-black">{book.author}</p>
                    <p className="my-0 text-black">${book.price}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const mapDispatch = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(Home);
