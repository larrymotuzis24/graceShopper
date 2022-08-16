import React from "react";
import { connect } from "react-redux";
import Nav from './Nav';

const Home = ({ books }) => {
    return (
        <div>
            <h1 id='homeTitle'> GraceShopper Bookstore Home   </h1>
            <div>
                    <h2> Top Rated </h2>
                </div>
                <div id='topBooksDiv'>
                    {
                        books.map(book => {
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

export default connect(state => state)(Home);