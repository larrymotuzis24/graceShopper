import React, { Component } from "react";
import { login } from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "./store/auth";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      regUsername: "",
      regPassword: "",
      regEmail: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      error: "",
      successMessage: ''
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
      this.setState({error: error.response.data.error.name});
      this.setState({username: ""});
      this.setState({password: ""});
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
      zipCode: this.state.zipCode
    };

    try {
      await this.props.register(user)
      this.setState({ regPassword: "" });
      this.setState({ regEmail: "" });
      this.setState({ regUsername: "" });
      this.setState({ address: "" });
      this.setState({ firstName: "" });
      this.setState({ lastName: "" });
      this.setState({error: ''});
      this.setState({city: ""});
      this.setState({state: ""});
      this.setState({zipCode: ""});
      this.setState({successMessage: 'A new user has been registered. Please Login!.'});
    } catch (error) {
      this.setState({ error: error.response.data.error });
      console.log(error);
      this.setState({ regPassword: "" });
      this.setState({ regEmail: "" });
      this.setState({ regUsername: "" });
      this.setState({ address: "" });
      this.setState({ firstName: "" });
      this.setState({ lastName: "" });
      this.setState({city: ""});
      this.setState({state: ""});
      this.setState({zipCode: ""});
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
      successMessage
    } = this.state;
    return (
      <div style={{height: '100vh'}}>
        <div style={{ marginTop: "13%" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-block", marginRight: "3%" }}>
              <h2
                style={{
                  marginRight: "91%",
                  marginBottom: "3%",
                  textIndent: "-15%",
                }}
              >
                Login
              </h2>
              <form onSubmit={onSubmit}>
                <input
                  style={{
                    backgroundColor: username.length > 0 ? 'white' : '#f0eded',
                    textIndent: "5px",
                    width: "350px",
                    marginTop: "3%",
                    height: "2.3em",
                    marginBottom: "3%",
                    marginRight: '1%'
                  }}
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
                  value={username}
                />
                <input
                  style={{
                    textIndent: "5px",
                    width: "350px",
                    marginBottom: "3%",
                    height: "2.3em",
                    backgroundColor: password.length > 0 ? 'white' : '#f0eded'
                  }}
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
                <button
                  style={{
                    background: "black",
                    color: "white",
                    width: "22%",
                    height: "31px",
                  }}
                  disabled={!username || !password}
                >
                  Sign In{" "}
                </button>
              </form>
            </div>
            <div style={{ display: "inline-block" }}>
              <h2 style={{ 
                marginRight: "70%", 
                marginBottom: "5%" }}>
                Register
              </h2>
              <form>
                <input
                  placeholder="Username"
                  style={{
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    textIndent: "5px",
                    backgroundColor: regUsername.length > 0 ? 'white' : '#f0eded'
                  }}
                  name="username"
                  onChange={(ev) =>
                    this.setState({ regUsername: ev.target.value })
                  }
                  value={regUsername}
                />
                <input
                  placeholder="Password"
                  style={{
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    textIndent: "5px",
                    backgroundColor: regPassword.length > 0 ? 'white' : '#f0eded'
                  }}
                  type="password"
                  name="password"
                  value={regPassword}
                  onChange={(ev) =>
                    this.setState({ regPassword: ev.target.value })
                  }
                />
                <input
                  placeholder="Email"
                  style={{
                    textIndent: "5px",
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    backgroundColor: regEmail.length > 0 ? 'white' : '#f0eded'
                  }}
                  name="password"
                  value={regEmail}
                  onChange={(ev) =>
                    this.setState({ regEmail: ev.target.value })
                  }
                />
                <input
                  placeholder="First Name"
                  style={{
                    textIndent: "5px",
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    backgroundColor: firstName.length > 0 ? 'white' : '#f0eded'
                  }}
                  name="password"
                  value={firstName}
                  onChange={(ev) =>
                    this.setState({ firstName: ev.target.value })
                  }
                />
                <input
                  placeholder="Last Name"
                  style={{
                    textIndent: "5px",
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    backgroundColor: lastName.length > 0 ? 'white' : '#f0eded'
                  }}
                  name="password"
                  value={lastName}
                  onChange={(ev) =>
                    this.setState({ lastName: ev.target.value })
                  }
                />
                <input
                  placeholder="Address"
                  style={{
                    textIndent: "5px",
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    backgroundColor: address.length > 0 ? 'white' : '#f0eded'
                  }}
                  name="address"
                  value={address}
                  onChange={(ev) => this.setState({ address: ev.target.value })}
                />
                <input
                  placeholder="City"
                  style={{
                    textIndent: "5px",
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    backgroundColor: city.length > 0 ? 'white' : '#f0eded'
                  }}
                  name="city"
                  value={city}
                  onChange={(ev) => this.setState({ city: ev.target.value })}
                />
                <select
                    name="state"
                    value={state}
                    onChange={(ev) =>  this.setState({state: ev.target.value})}
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
                    textIndent: "5px",
                    width: "350px",
                    height: "2.3em",
                    marginBottom: "3%",
                    backgroundColor: zipCode.length > 0 ? 'white' : '#f0eded'
                  }}
                  name="zipCode"
                  value={zipCode}
                  onChange={(ev) => this.setState({ zipCode: ev.target.value })}
                />
                <button
                  onClick={onRegister}
                  style={{
                    background: "black",
                    color: "white",
                    width: "22%",
                    height: "31px",
                    marginTop: "1%",
                  }}
                  disabled={!regUsername || !regPassword || !regEmail || !firstName || !lastName || !address}
                >
                  {" "}
                  Register{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
        <pre>{error ? JSON.stringify(error) : null}</pre>
        <pre id="sucess-register">{successMessage ? JSON.stringify(successMessage): null}</pre>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return state;
}

const mapDispatch = (dispatch, { history }) => {
  return {
    login: (credentials) =>  dispatch(login(credentials, history)),
    register: (user) => dispatch(register(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(SignIn);
