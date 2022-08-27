import React, { Component } from 'react';
import { login } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from './store/auth';

class SignIn extends Component {
  constructor() {
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
      city: '',
      state: '',
      zipCode: '',
      error: '',
      successMessage: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  changeEmail(ev) {
    this.setState({ email: ev.target.value });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      await this.props.login(this.state);
    } catch (error) {
      this.setState({ error: error.response.data.error.name });
      this.setState({ username: '' });
      this.setState({ password: '' });
    }
  }

  async onRegister(ev) {
    ev.preventDefault();
    const user = {
      password: this.state.regPassword,
      email: this.state.regEmail,
      username: this.state.regUsername,
      address: this.state.address,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
    };

    try {
      await this.props.register(user);
      this.setState({ regPassword: '' });
      this.setState({ regEmail: '' });
      this.setState({ regUsername: '' });
      this.setState({ address: '' });
      this.setState({ firstName: '' });
      this.setState({ lastName: '' });
      this.setState({ error: '' });
      this.setState({ city: '' });
      this.setState({ state: '' });
      this.setState({ zipCode: '' });
      this.setState({
        successMessage: 'A new user has been registered. Please Login!.',
      });
    } catch (error) {
      this.setState({ error: error.response.data.error });
      this.setState({ regPassword: '' });
      this.setState({ regEmail: '' });
      this.setState({ regUsername: '' });
      this.setState({ address: '' });
      this.setState({ firstName: '' });
      this.setState({ lastName: '' });
      this.setState({ city: '' });
      this.setState({ state: '' });
      this.setState({ zipCode: '' });
    }
  }
  render() {
    const { onChange, onSubmit, onRegister } = this;
    const { states } = this.props;
    const {
      username,
      password,
      regUsername,
      regPassword,
      regEmail,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      error,
      successMessage,
    } = this.state;
    return (
      <div style={{ minHeight: '80vh' }}>
        <div style={{ marginTop: '10%' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', marginRight: '3%' }}>
              <h3
                style={{
                  marginRight: '91%',
                  marginBottom: '3%',
                  textIndent: '-15%',
                }}
              >
                Login
              </h3>
              <form onSubmit={onSubmit}>
                <input
                  style={{
                    backgroundColor: username.length > 0 ? 'white' : '#eef7ea',
                    textIndent: '5px',
                    width: '350px',
                    marginTop: '3%',
                    height: '2.3em',
                    marginBottom: '3%',
                    marginRight: '1%',
                  }}
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
                  value={username}
                  class="form-control"
                />
                <input
                  style={{
                    textIndent: '5px',
                    width: '350px',
                    marginBottom: '3%',
                    height: '2.3em',
                    backgroundColor: password.length > 0 ? 'white' : '#eef7ea',
                  }}
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  class="form-control"
                />
                <button
                  className="btn btn-dark"
                  style={{}}
                  disabled={!username || !password}
                >
                  SIGN IN{' '}
                </button>
              </form>
            </div>
            <div style={{ display: 'inline-block' }}>
              <h3
                style={{
                  marginRight: '70%',
                  marginBottom: '5%',
                }}
              >
                Register
              </h3>
              <form>
                <input
                  placeholder="Username"
                  style={{
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    textIndent: '5px',
                    backgroundColor:
                      regUsername.length > 0 ? 'white' : '#eef7ea',
                  }}
                  name="username"
                  onChange={(ev) =>
                    this.setState({ regUsername: ev.target.value })
                  }
                  value={regUsername}
                  class="form-control"
                />
                <input
                  placeholder="Password"
                  style={{
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    textIndent: '5px',
                    backgroundColor:
                      regPassword.length > 0 ? 'white' : '#eef7ea',
                  }}
                  type="password"
                  name="password"
                  value={regPassword}
                  onChange={(ev) =>
                    this.setState({ regPassword: ev.target.value })
                  }
                  class="form-control"
                />
                <input
                  placeholder="Email"
                  style={{
                    textIndent: '5px',
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    backgroundColor: regEmail.length > 0 ? 'white' : '#eef7ea',
                  }}
                  name="password"
                  value={regEmail}
                  onChange={(ev) =>
                    this.setState({ regEmail: ev.target.value })
                  }
                  class="form-control"
                />
                <input
                  placeholder="First Name"
                  style={{
                    textIndent: '5px',
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    backgroundColor: firstName.length > 0 ? 'white' : '#eef7ea',
                  }}
                  name="password"
                  value={firstName}
                  onChange={(ev) =>
                    this.setState({ firstName: ev.target.value })
                  }
                  class="form-control"
                />
                <input
                  placeholder="Last Name"
                  style={{
                    textIndent: '5px',
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    backgroundColor: lastName.length > 0 ? 'white' : '#eef7ea',
                  }}
                  class="form-control"
                  name="password"
                  value={lastName}
                  onChange={(ev) =>
                    this.setState({ lastName: ev.target.value })
                  }
                />
                <input
                  placeholder="Address"
                  style={{
                    textIndent: '5px',
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    backgroundColor: address.length > 0 ? 'white' : '#eef7ea',
                  }}
                  name="address"
                  value={address}
                  onChange={(ev) => this.setState({ address: ev.target.value })}
                  class="form-control"
                />
                <input
                  placeholder="City"
                  style={{
                    textIndent: '5px',
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    backgroundColor: city.length > 0 ? 'white' : '#eef7ea',
                  }}
                  name="city"
                  value={city}
                  onChange={(ev) => this.setState({ city: ev.target.value })}
                  class="form-control"
                />
                <select
                  name="state"
                  value={state}
                  onChange={(ev) => this.setState({ state: ev.target.value })}
                  className="form-select"
                >
                  <option value="">-- Select a State --</option>
                  {states.map((state) => {
                    return (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    );
                  })}
                </select>
                <input
                  placeholder="Zip Code"
                  style={{
                    textIndent: '5px',
                    width: '350px',
                    height: '2.3em',
                    marginBottom: '3%',
                    backgroundColor: zipCode.length > 0 ? 'white' : '#eef7ea',
                  }}
                  class="form-control"
                  name="zipCode"
                  value={zipCode}
                  onChange={(ev) => this.setState({ zipCode: ev.target.value })}
                />
                <button
                  onClick={onRegister}
                  style={{}}
                  className="btn btn-dark"
                  disabled={
                    !regUsername ||
                    !regPassword ||
                    !regEmail ||
                    !firstName ||
                    !lastName ||
                    !address
                  }
                >
                  {' '}
                  REGISTER{' '}
                </button>
              </form>
            </div>
          </div>
        </div>
        <pre>{error ? JSON.stringify(error) : null}</pre>
        <pre id="sucess-register">
          {successMessage ? JSON.stringify(successMessage) : null}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatch = (dispatch, { history }) => {
  return {
    login: (credentials) => dispatch(login(credentials, history)),
    register: (user) => dispatch(register(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(SignIn);
