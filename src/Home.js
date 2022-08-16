import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'


const Home = ({ books }) => {
  const topBooks = books.filter(book => book.rating >= 4);
    return (
        <div>
            <h1 id='homeTitle'> GraceShopper Bookstore Home   </h1>
            <div>
                <h2> Top Rated </h2>
            </div>
            <div className='top-books-info'>
            {
                 topBooks.map(book => {
                    return (
                        <div key={ book.id } className='homeBookDiv'>
                            <h3> <Link to={`books/${book.id}`}> { book.title } </Link></h3>
                            <p> { book.author }</p>
                            <p> { book.rating } </p>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>    

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
  