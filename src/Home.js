import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeaturedCarousel from './FeaturedCarousel';
import StarRatingDisplay from './StarRatingDisplay';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Home = ({ books, auth }) => {
  const topBooks = books.filter((book) => (book.rating = 5));
  return (
    <Container id="home-page">
      <FeaturedCarousel />
      <h2 class="display-4 my-4">Top Rated Books</h2>
      <div class="container">
        <div class="row" style={{ gap: '2rem' }}>
          {topBooks.map((book) => {
            return (
              <Link to={`books/${book.id}`} style={{ display: 'contents' }}>
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
          {/* <div class="col card">1</div>
          <div class="col card">2</div>
          <div class="col card">3</div> */}
        </div>
        {/* <div class="row">
          <div class="col card">4</div>
          <div class="col card">5</div>
          <div class="col card">6</div>
        </div> */}
      </div>
      {/* <div className="">
        {topBooks.map((book) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={book.imageUrl} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
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
      </div> */}
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
