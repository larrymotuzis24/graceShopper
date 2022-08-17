import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "./store";

class UserEdit extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
      email: this.props.auth.email,
      address: this.props.auth.address,
    });
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
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      email: this.state.email,
      address: this.state.address,
    };

    try {
      if (
        !/^[a-zA-Z ]*$/g.test(user.firstName) ||
        !/^[a-zA-Z ]*$/g.test(user.lastName)
      ) {
        throw "First Name and Last Name must be alphabet characters";
      } else {
        await this.props.editUser(user);
      }
    } catch (error) {
      if (typeof error === "string") {
        this.setState({ error: error });
      } else {
        this.setState({ error: error.response.data.err.errors[0].message });
      }
    }
  }

  render() {
    const { auth, history } = this.props;
    const { firstName, lastName, email, address, error } = this.state;
    const { onChange, save } = this;

    return (
      <div id="edit-user">
        <h2>
          Welcome, {auth.firstName} {auth.lastName}!
        </h2>
        <form onSubmit={save} >
          <label htmlFor="firstName">First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            name="firstName"
            onChange={onChange}
            className='input'
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            name="lastName"
            onChange={onChange}
          />
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            value={email}
            name="email"
            onChange={onChange}
          />
          <label htmlFor="address">Address</label>
          <input
            placeholder="Address"
            value={address}
            name="address"
            onChange={onChange}
          />
          <button disabled={!firstName || !lastName || !email || !address}>
            Edit
          </button>
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
    editUser: (user) => dispatch(editUser(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
