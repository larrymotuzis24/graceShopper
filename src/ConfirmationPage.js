import React, {Component} from "react";
import { connect } from 'react-redux';
// import { fetchOrders} from './store'

class ConfirmationPage extends Component{ 

  render() {

    const { auth, cart} = this.props;
    console.log(this.props)
   
    return (
        <div style={{
          alignItems:'center',
          marginTop:'100px'
        }}>
        <h3 style={{
          textAlign:'center',
        }}> {auth.firstName}, Thank you for your order! </h3>
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          marginBottom:'200px'
        }}>
        <p
        style={{
          padding:'10px'
        }}> We sent a confirmation email to {auth.email}. </p>
        <p style={{
          padding:'10px'
        }}> A second email will be sent once your order is shipped . </p> 


        </div>
        </div>
    )
  }
};


const mapStateToProps = ({ auth, cart }) =>{
  return {
      auth,
      cart
  };
}

export default connect(mapStateToProps)(ConfirmationPage);