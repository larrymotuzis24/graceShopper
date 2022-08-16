import React, { Component } from 'react';
import { login } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
class SignIn extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this)
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  changeEmail(ev){
    this.setState({ email: ev.target.value })
  }
  onSubmit(ev){
    ev.preventDefault();
    this.props.login(this.state);
  }
  render(){
    const { onChange, onSubmit, changeEmail } = this;
    const { username, password, email } = this.state;
    return (
      <div>
        <div style={{marginTop: '13%'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'inline-block'}}>
              <h2 style={{marginRight: '73%', marginBottom: '1%', textIndent: '-15%'}}>Login</h2>
                <form onSubmit={ onSubmit }>
                  <input style={{
                    textIndent: '5px',
                    width: '350px', 
                    marginTop: '3%', 
                    height: '2.3em',
                    marginBottom: '1%'
                  }} placeholder='Username' name='username' onChange={ onChange } value={ username }/>
                  <input style={{
                    textIndent: '5px',
                    width: '350px', 
                    marginBottom: '0%', 
                    height: '2.3em'
                    }} placeholder='Password'type='password' name='password' value={ password } onChange={ onChange }/>
                  <button style={{
                    background: 'black',
                    color: 'white',
                    width: '22%',
                    height: '31px'
                  }}>Sign In </button>  
                  <p style={{
                    marginTop: '0%',
                    marginLeft: '-49%'
                  }}> 
                    <Link to='/placeholder'> Forgot your password? </Link>
                  </p>            
                </form>
            </div>
            <div style={{display: 'inline-block'}}>
              <h2 style={{marginRight: '70%', marginBottom: '-1%'}}>Register</h2>
                <form onSubmit={ onSubmit }>
                  <input placeholder='Name' style={{
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                    textIndent: '5px',
                  }} 
                    name='username' onChange={ onChange } value={ username }/>
                  <input placeholder='Password' style={{
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                    textIndent: '5px',
                  }} type='password' name='password' value={ password } onChange={ onChange }/>
                  <input placeholder='Email' style={{
                    textIndent: '5px',
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '4%',
                  }} type='password' name='password' value={ email } onChange={ changeEmail }/>
                  <button style={{
                    background: 'black',
                    color: 'white',
                    width: '22%',
                    height: '31px',
                    marginTop: '0%'
                  }}> Register </button> 
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch)=> {
  return {
    login: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

export default connect(null, mapDispatch)(SignIn);
