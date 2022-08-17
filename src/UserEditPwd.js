import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "./store";

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
    }
  }

  render() {
    const { auth, history } = this.props;
    const { password, newPassword, error } = this.state;
    const { onChange, save } = this;

    return (
        <div id="edit-user-password">
          <h2>
            Welcome, {auth.firstName} {auth.lastName}!
          </h2>
          <form onSubmit={save}>
            <label htmlFor="password">Current Password</label>
            <input
              type="password"
              placeholder="Current Password"
              value={password}
              name="password"
              onChange={onChange}
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              name="newPassword"
              onChange={onChange}
            />
            <button>Update Password</button>
            <button onClick={() => history.push("/user")}>Cancel</button>
          </form>
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
