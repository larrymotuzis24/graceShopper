import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from './store';
import Button from 'react-bootstrap/Button';
class UserEditPwd extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      newPassword: '',
      error: '',
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
      this.setState({ password: '', newPassword: '' });
    }
  }

  render() {
    const { auth, history } = this.props;
    const { password, newPassword, error } = this.state;
    const { onChange, save } = this;

    return (
      <div id="" className="container mt-4" style={{ minHeight: '90vh' }}>
        <div style={{}}>
          <h3 style={{}}>
            Welcome, {auth.firstName} {auth.lastName}!
          </h3>
          <h6 style={{}}> Let's get your password changed, shall we? </h6>
          <form onSubmit={save} className="w-50 mt-5">
            <label style={{}} className="small" htmlFor="password">
              Current Password
            </label>
            <input
              style={{}}
              type="password"
              placeholder="Current Password"
              value={password}
              name="password"
              onChange={onChange}
              class="form-control"
            />
            <label style={{}} htmlFor="newPassword" className="small">
              New Password
            </label>
            <input
              style={{}}
              type="password"
              placeholder="New Password"
              value={newPassword}
              name="newPassword"
              onChange={onChange}
              class="form-control"
            />
            <div
              style={{
                display: 'flex',
              }}
            >
              <button
                style={{}}
                onClick={() => history.push('/user')}
                className="btn btn-dark me-4"
              >
                UPDATE PASSWORD
              </button>
            </div>
          </form>
          <a href="#user" className="btn btn-light border-dark">
            CANCEL
          </a>
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
