import React, {Component} from "react";
import { connect } from 'react-redux';
import {
  MdCelebration
} from 'react-icons/md'
class ConfirmationPage extends Component{ 

  render() {

    const { auth, cart} = this.props;
    console.log(this.props)
   
    return (
        <div style={{
          alignItems:'center',
          marginTop:'300px',
          height: '57vh'
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
        <h4
        style={{
          padding:'10px'
        }}> We sent a confirmation email to {auth.email}. </h4>
        <h6 style={{
          padding:'10px'
        }}> Another email will be sent once your orer has been sent. 
        </h6> 
        <MdCelebration size={300}/>
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