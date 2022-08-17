import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FeaturedCarusel from './FeaturedCarusel';
import StarRatingDisplay from "./StarRatingDisplay";



const Home = ({ books, auth }) => {
  const topBooks = books.filter(book => book.rating >= 4);
    return (
        <div id="home-page">
            <FeaturedCarusel />
            {auth.id ? (
              <h2>
                Welcome, {auth.firstName} {auth.lastName}!
              </h2>
             ) : null}
            <div id='homeTitle'>
                <h1 id='homeTitle'> GraceShopper Bookstore Home   </h1>
                <h2> Top Rated </h2>
            </div>
            <div className='top-books-info'>
            {
                 topBooks.map(book => {
                    console.log(book)
                    return (
                        <div key={ book.id } className='homeBookDiv'>
                            <h3> <Link to={`books/${book.id}`}> { book.title } </Link></h3>
                            <img src={book.imageUrl} />
                            <p> { book.author }</p>
                            <StarRatingDisplay  book={book} /> 

                        </div>
                            )
                        })
                    }
            </div>
            <footer id='homeFooter'>
                <div id='homeFooterDiv'>
                    <div className='footer-individual-detail-div'>
                        <p> Connect </p>
                        <a href=''> Twitter </a>
                        <a href=''> Instagram </a>

                    </div>
                    <div className='footer-individual-detail-div'>
                        <p> Account </p>
                        {
                            !auth.id ? <Link to={''}> Create Account </Link> : <Link to={''}> My Account</Link>
                        }

                    </div>
                </div>
             </footer>
        </div>
    )
};

const mapDispatch = (dispatch) => {
    return {

    };
  };
  
  const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps, mapDispatch)(Home);
