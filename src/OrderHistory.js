import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderHistory = (props) =>{

    const { cart } = props;
    console.log(cart);

    return (
        <p>Coming Soon!!!</p>
    )
}

const mapStateToProps = (state) =>{
    return state;
}

export default connect(mapStateToProps)(OrderHistory);