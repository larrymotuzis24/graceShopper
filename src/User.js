import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class User extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <h2>
          Welcome, {auth.firstName} {auth.lastName}!
        </h2>
        <main>
          <div>
            <div>
              <Link to="/user">Account Details</Link>
              <h3>First Name and Last Name</h3>
              <p>
                {auth.firstName} {auth.lastName}
              </p>
              <h3>Address</h3>
              <p>{auth.address}</p>
              <h3>Email</h3>
              <p>{auth.email}</p>
            </div>
          </div>
          <div>
              <div>
                  <Link to='/editUser'>Edit Personal Information</Link>
              </div>
          </div>
          <div>
              <div>
                  <Link to='/passwordUser'>Change Password</Link>
                    
              </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(User);
