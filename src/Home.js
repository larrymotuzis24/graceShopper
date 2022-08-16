import React from "react";
import { connect } from "react-redux";
import Nav from './Nav';

const Home = ({ books }) => {
    return (
        <div>
            <h1> GraceShopper Bookstore Home   </h1>
            <div>
                    {
                        books.map(book => {
                            return (
                                <div key={ book.id }>
                                    <h3> { book.title }</h3>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
};

export default connect(state => state)(Home);