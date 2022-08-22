import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const WishList = (props) =>{

    const { wishList } = props;

    console.log(wishList)

    return (
        <p>Coming Soon!</p>
    )
}

const mapStateToProps = (state) =>{
    return state;
}

export default connect(mapStateToProps)(WishList);