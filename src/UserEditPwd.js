import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "./store";
import Button from 'react-bootstrap/Button'
class UserEditPwd extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      newPassword: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async save(ev) {
    ev.preventDefault();
    const user = {
      id: this.props.auth.id,
      password: this.props.auth.password,
      checkPassword: this.state.password,
      newPassword: this.state.newPassword,
    };

    try {
      await this.props.updateUserPassword(user);
    } catch (error) {
      this.setState({ error: error.response.data.error });
      this.setState({password: '', newPassword: ''})
    }
  }

  render() {
    const { auth, history } = this.props;
    const { password, newPassword, error } = this.state;
    const { onChange, save } = this;

    return (
        <div id="edit-user-password" style={{
          height: '70vh'
        }}>
          <div style={{
            marginTop: '200px'
          }}>
            <h2 style={{
                  marginRight: '42%'
            }}>
              Welcome, {auth.firstName} {auth.lastName}!
            </h2>
            <h4 style={{
                  marginLeft: '37%',
                  marginBottom: '20px'
            }}> Let's get your password changed, shall we? </h4>
            <form onSubmit={save}>
              <label style={{
                marginRight: '5.7%',
                fontWeight: '10px'
              }} htmlFor="password">Current Password
              </label>
              <input
                style={{
                  borderRadius: '10px'
                }}
                type="password"
                placeholder="Current Password"
                value={password}
                name="password"
                onChange={onChange}
              />
              <label style={{
                marginRight: '6.4%'
              }}htmlFor="newPassword">New Password</label>
              <input
                style={{
                  borderRadius: '10px'
                }}
                type="password"
                placeholder="New Password"
                value={newPassword}
                name="newPassword"
                onChange={onChange}
              />
              <div style={{
                display: 'flex'
              }}>
                <button style={{
                  backgroundColor: 'blue'
                }} 
                className="btn btn-primary w-50">Update Password</button>
                <Button  onClick={() => history.push("/user")}>Cancel</Button>
              </div>
            </form>
          </div>
          <pre>{error ? JSON.stringify(error) : null}</pre>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUserPassword: (user) => dispatch(editUser(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPwd);
