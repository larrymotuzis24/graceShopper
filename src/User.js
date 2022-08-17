import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class User extends Component {
  render() {
    const { auth, match } = this.props;
    console.log(auth)
    const path = match.path;
    return (
      <div id="user-profile">
        <h2>
          Welcome, {auth.firstName} {auth.lastName}!
        </h2>
        <main className="user-info">
            <div className="user-links">
              <Link to="/user">Account Details</Link>
              <Link to="/editUser">Edit Personal Information</Link>
              <Link to="/passwordUser">Change Password</Link>
            </div>
            {path === "/user" ? (
              <div className="user-personal-info">
                <img src={auth.imageUrl}/>
                <h3>First Name</h3>
                <p>{auth.firstName}</p>
                <h3>Last Name</h3>
                <p>{auth.lastName}</p>
                <h3>Address</h3>
                <p>{auth.address}</p>
                <h3>Email</h3>
                <p>{auth.email}</p>
              </div>
            ) : null}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(User);
