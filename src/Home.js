import React from "react";
import { connect } from "react-redux";

const Home = (state) => {
    console.log(state)
    return (
        <div>
            <h1> GraceShopper Bookstore </h1>
        </div>
    )
};

export default connect(state => state)(Home);