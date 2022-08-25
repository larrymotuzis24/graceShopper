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
    <div className="container p-4" id="home-page">
      <FeaturedCarousel />
      <h2 className="display-4 my-4">Top Rated Books</h2>
      <div className="row row-cols-2 row-cols-lg-4">
        {topBooks.map((book) => {
          return (
            <div key={book.id} className="col">
              <div className="card border-0 bg-transparent mb-5" style={{background: '#eef7ea'}}>
                  <Link
                    id={book.id}
                    to={`books/${book.id}`}
                    className="text-decoration-none"
                  >
                  <div style={{height: '19vh'}}>
                    <img
                      src={book.imageUrl}
                      style={{
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'black',
                        padding: '2rem',
                      }}
                      className="rounded-2 mb-2 card-img-top"
                    />
                  </div>
                  <div className="card-body p-0" style={{background: '#eef7ea'}}>
                    <p className="my-0 text-black">{book.title}</p>
                    <p className="my-0 text-black">{book.author}</p>
                    <p className="my-0 text-black">${book.price}</p>
                  </div>
                </Link>
              </div>
            </div>
          );``
        })}
      </div>
      <div style={{display: 'flex', height: '600px', width: '58vw', borderRadius: '25px'}}>
        <div style={{display: 'inline-block', height: '100%', width: '100%', float: 'right'}}>
          <div style={{
          height: '100%',
          width: '100%',
          borderRadius: '25px 0px 0px 25px',
          background: '#0F301D'
          }}>
            <h4 style={{textIndent: '15px', color: 'pink'}}> Code Source Books was developed by Luis, Larry, Seth, and Ioan. </h4>
            <h4 style={{textIndent: '15px', color: 'pink'}}> This is the nicest bookstore website you've ever seen!</h4>
          </div>
        </div>
        <div style={{display: 'inline-block', height: '100%', width: '100%', float: 'left'}}>
          <img style={{
          height: '100%',
          width: '100%',
          borderRadius: '0 25px 25px 0'}}src='https://images.pexels.com/photos/1029807/pexels-photo-1029807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'/>
        </div>
      </div>
    </div>
    
  );
};

const mapDispatch = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(Home);
