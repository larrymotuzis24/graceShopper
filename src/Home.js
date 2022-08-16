import React from "react";
import { connect } from "react-redux";
import Nav from './Nav';

const Home = ({ books }) => {
  const topBooks = books.filter(book => book.rating >= 4);
    return (
        <div>
            <h1 id='homeTitle'> GraceShopper Bookstore Home   </h1>
            <div>
                    <h2> Top Rated </h2>
                </div>
                <div id='topBooksDiv'>
                    {
                        topBooks.map(book => {
                            return (
                                <div key={ book.id } className='homeBookDiv'>
                                    <h3> { book.title }</h3>
                                    <p> { book.author }</p>
                                    <p> { book.rating } </p>
                                </div>
                            )
                        })
                    }
            </div>
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
  