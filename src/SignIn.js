import React, { Component } from 'react';
import { login } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from './store/auth'
class SignIn extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      regUsername: '',
      regPassword: '',
      regEmail: '',
      firstName: '',
      lastName: '',
      address: '',
      isAdmin: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this)
    this.onRegister = this.onRegister.bind(this)

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
  onRegister(ev){
    ev.preventDefault()
    const user = {
      password: this.state.regPassword,
      email: this.state.regEmail,
      username: this.state.regUsername,
      address: this.state.address,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isAdmin: this.state.isAdmin
    }
    this.props.register(user)
    this.setState({ regPassword: '' })
    this.setState({ regEmail: ''})
    this.setState({ regUsername: '' })
    this.setState({ address: '' })
    this.setState({ firstName: '' })
    this.setState({ lastName: '' })
    this.setState({ isAdmin: '' })
  }
  render(){
    const { onChange, onSubmit, onRegister } = this;
    const { username, password, regUsername, regPassword, regEmail, firstName, lastName, address, isAdmin } = this.state;
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
                <form >
                  <input placeholder='Name' style={{
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                    textIndent: '5px',
                  }} 
                    name='username' onChange={(ev) => this.setState({ regUsername: ev.target.value }) } value={ regUsername }/>
                  <input placeholder='Password' style={{
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                    textIndent: '5px',
                  }} type='password' name='password' value={ regPassword } onChange={ (ev) => this.setState({ regPassword: ev.target.value }) }/>
                  <input placeholder='Email' 
                  style={{
                    textIndent: '5px',
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                  }}  name='password' value={ regEmail } onChange={(ev) => this.setState({ regEmail: ev.target.value })  }/>
                   <input placeholder='First Name' style={{
                    textIndent: '5px',
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                  }} name='password' value={ firstName } onChange={(ev) => this.setState({ firstName: ev.target.value })  }/>
                   <input placeholder='Last Name' style={{
                    textIndent: '5px',
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                  }}  name='password' value={ lastName } onChange={(ev) => this.setState({ lastName: ev.target.value })  }/>
                   <input placeholder='Address' style={{
                    textIndent: '5px',
                    width: '350px', 
                    height: '2.3em', 
                    marginBottom: '0%',
                  }}  name='password' value={ address } onChange={(ev) => this.setState({ address: ev.target.value })  }/>
                  <select 
                  value={isAdmin}
                  defaultValue="" 
                  style={{
                        textIndent: '5px',
                        width: '350px', 
                        height: '2.3em', 
                        marginBottom: '0%',
                        defaultValue: 'Admin or User',
                      }} 
                  onChange={(ev) => this.setState({ isAdmin: ev.target.value })  }
                  >
                      <option value="" disabled>Select User Permissions</option>
                      <option value="true">Admin</option>
                      <option value='false'>User</option>
                    </select>
                  <button onClick={onRegister} style={{
                    background: 'black',
                    color: 'white',
                    width: '22%',
                    height: '31px',
                    marginTop: '3%'
                  }}> Register </button> 
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history })=> {
 return {
  login: (credentials)=> {
   dispatch(login(credentials, history));
  },
  register: (user) => dispatch(register(user))
 };
};

export default connect(null, mapDispatch)(SignIn);
