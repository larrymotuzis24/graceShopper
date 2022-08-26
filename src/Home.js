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
  const firstTopBooks = topBooks.slice(0, 8);
  const secondTopBooks = topBooks.slice(8, 16);
  return (
    <div className="container" id="home-page">
      <FeaturedCarousel />
      <div className="d-flex justify-content-between align-items-baseline mt-4">
        <h2 className="display-4 mb-4 mt-5">Top Rated Books</h2>
        <a href="#books" style={{ textDecoration: 'none' }}>
          VIEW ALL
        </a>
      </div>
      <div className="row row-cols-2 row-cols-lg-4">
        {firstTopBooks.map((book) => {
          return (
            <div className="col" key={book.id}>
              <div
                key={book.id}
                className="card border-0 bg-transparent mb-5"
                style={{ background: '#eef7ea' }}
              >
                <Link
                  id={book.id}
                  to={`books/${book.id}`}
                  className="text-decoration-none"
                >
                  <div style={{ height: '400px' }}>
                    <img
                      src={book.imageUrl}
                      style={{
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'black',
                        padding: '20%',
                      }}
                      className="rounded-4 mb-2 card-img-top"
                    />
                  </div>
                  <div
                    className="card-body pt-3 pb-0 px-0"
                    style={{ background: '#eef7ea' }}
                  >
                    <p className="my-0 text-black lead">{book.title}</p>
                    <p className="my-0 text-black lead">{book.author}</p>
                    <p className="my-0 text-black lead">${book.price}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
          ``;
        })}
      </div>
      <div
        className="w-100 rounded-4 d-flex align-items-center"
        style={{
          backgroundColor: 'B7C6E5',
          padding: '2rem 4rem 2rem 0rem',
          margin: '3rem 0 6rem 0',
          height: '35%',
          maxHeight: '400px',
        }}
      >
        <h2 className="display-2 text-black text-center">
          Follow us on Instagram @sourcecodebooks
        </h2>
        <img
          src="../../public/images/computer-kickflip.svg"
          style={{ width: '40%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div className="row row-cols-2 row-cols-lg-4">
        {secondTopBooks.map((book) => {
          return (
            <div key={book.id} className="col">
              <div
                className="card border-0 bg-transparent mb-5"
                style={{ background: '#eef7ea' }}
              >
                <Link
                  id={book.id}
                  to={`books/${book.id}`}
                  className="text-decoration-none"
                >
                  <div style={{ height: '400px' }}>
                    <img
                      src={book.imageUrl}
                      style={{
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'black',
                        padding: '20%',
                      }}
                      className="rounded-4 mb-2 card-img-top"
                    />
                  </div>
                  <div
                    className="card-body pt-3 pb-0 px-0"
                    style={{ background: '#eef7ea' }}
                  >
                    <p className="my-0 text-black lead">{book.title}</p>
                    <p className="my-0 text-black lead">{book.author}</p>
                    <p className="my-0 text-black lead">${book.price}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
          ``;
        })}
      </div>

      <div
        className="w-100 d-flex rounded-4 mb-5 mt-3"
        style={{
          backgroundColor: '#0F301D',
          overflow: 'hidden',
          height: '65vh',
          maxHeight: '600px',
        }}
      >
        <div
          className="m-4 w-50 d-flex flex-column justify-content-between"
          style={{}}
        >
          <div>
            <h6 className="text-light mb-4">
              Source Code Books was developed in 2022 by Luis Rodriguez,
              Laurynas Motuzis, Seth King, and Ioan Butiu. We hope you enjoy our
              bookstore website!
            </h6>
            <a href="" className="text-light text-decoration-none">
              LEARN MORE
            </a>
          </div>
          <div className="d-flex flex-row-reverse align-items-end justify-content-end">
            <img
              className=""
              src="../../public/images/happy-computer.svg"
              style={{
                width: '50%',
              }}
            />
          </div>
        </div>

        <img
          className="w-50"
          style={{
            objectFit: 'cover',
            objectPosition: 'right bottom',
          }}
          src="https://cdn.shopify.com/s/files/1/0250/7449/9680/t/3/assets/Figure-1.jpg?v=15035377878287371951596479022"
        />
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
