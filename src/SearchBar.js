import React from "react";
import { connect } from 'react-redux';

const SeachBar = () => {
    return (
        <div>
        <input id='searchBarInput' placeholder='Find What Your Looking for' />
      </div>
    )
};

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(SeachBar);
