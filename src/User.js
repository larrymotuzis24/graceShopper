import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class User extends Component {

  render() {
    const { auth } = this.props;
    return (
      <div>
        <h2>
          Welcome {auth.firstName} {auth.lastName}
        </h2>
        <main>
          <div>
            <Link to="/user">Account Details</Link>
            <p>
              {auth.firstName} {auth.lastName}
            </p>
            <p>{auth.address}</p>
            <p>{auth.email}</p>
          </div>
          <div>
            <Link to="/editUser"></Link>
          </div>
          <div>
            <Link to="/editUserPassword"></Link>
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
