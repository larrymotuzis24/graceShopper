import React, { Component } from "react";
import ReactStars from 'react-stars';
import { connect } from "react-redux";

class StarRatingDisplay extends Component {
    constructor(){
        super();
        this.state = {
            rating:1
        }
    }
    componentDidMount(){
       this.setState({ rating: this.props.book.rating})

    }
    render(){
        return (

        
        <ReactStars
        count={5}
        value={this.state.rating}
        edit={false}
        size={24}
        color2={'#ffd700'} />
        )
    }
};

const mapState = (state) => {
    return state;
};

const mapDispactch = (dispatch) => {
    return {

    }
};

export default connect(mapState, mapDispactch)(StarRatingDisplay)