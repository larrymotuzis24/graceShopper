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
      <div className="container">
        <div className="row" style={{ gap: '2rem' }}>
          {topBooks.map((book) => {
            return (
              <Link key={book.id} to={`books/${book.id}`} style={{ display: 'contents' }}>
                <Card
                  style={{
                    width: '18rem',
                    padding: '0',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={book.imageUrl}
                    style={{
                      height: '400px',
                      objectFit: 'contain',
                      backgroundColor: 'black',
                      padding: '2rem',
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author}</Card.Text>
                    <Card.Text>{book.price}</Card.Text>
                    {/* <Card.Text>
                    
                          {book.inventory >= 1 && book.inventory <= 10 ? (
                          <span id="stock-left">Only {book.inventory} left in Stock - Order soon.</span>
                          ) : book.inventory > 10 ? (
                          <span id="in-stock">In Stock</span>
                          ) : (
                          <span id="out-stock">Out of Stock</span>
                            )}
                        
                    </Card.Text> */}
                  </Card.Body>
                </Card>
              </Link>
              // <div key={book.id} className="homeBookDiv">
              //   <img src={book.imageUrl} />
              //   <h5>
              //     {' '}
              //     <Link to={`books/${book.id}`}> {book.title} </Link>
              //   </h5>
              //   <p> {book.author}</p>
              //   <StarRatingDisplay book={book} />
              // </div>
            );
          })}
          {/* <div className="col card">1</div>
          <div className="col card">2</div>
          <div className="col card">3</div> */}
        </div>
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
