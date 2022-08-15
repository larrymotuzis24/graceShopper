import React from "react";
import { connect } from "react-redux";
import Nav from './Nav';

const Home = ({ books }) => {
    console.log(books)
    return (
        <div>
            <h1> GraceShopper Bookstore  </h1>
        </div>
    )
};

export default connect(state => state)(Home);