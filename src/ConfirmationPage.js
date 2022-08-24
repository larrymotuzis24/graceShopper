import React from "react";
import { connect } from 'react-redux';

const ConfirmationPage = ({auth}) => {

    return (
        <div>
        <h1> {auth.firstName} Order is being prepared </h1>
    
        </div>
    )
};



const mapStateToProps = ({ auth }) => {
    return {
      auth
    };
  };
  
  const mapDispatchToProps = (dispatch, { history }) => {
    return {
   
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
  