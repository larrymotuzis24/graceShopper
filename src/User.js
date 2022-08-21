import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editUser } from "./store";

class User extends Component {
  constructor(){
    super();
    this.state = {
      avatar: ''
    }
    this.save = this.save.bind(this);
  }

  componentDidMount(){
    this.el.addEventListener('change', (ev) =>{
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () =>{
        this.setState({avatar: reader.result})
      })
      reader.readAsDataURL(file);
    })
  }

  save(ev){
    ev.preventDefault();
    const user = {
      id: this.props.auth.id,
      imageUrl: this.state.avatar
    };
    this.props.saveAvatar(user);
  }

  render() {
    const { auth, match } = this.props;
    const path = match.path;
    const { avatar } = this.state;
    const { save } = this;
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
              <Link to="/addressUser">Add a new Shipping Address</Link>
            </div>
            {path === "/user" ? (
              <div className="user-personal-info">
                { !avatar ? <img src={auth.imageUrl}/> : <img src={ avatar }/>}
                <div id="user-avatar">
                  <form onSubmit={save}>
                    <p><span>Change your avatar</span></p>
                    <input type='file' ref={el => this.el = el}/>
                    <button id="btn-avatar">Save Avatar</button>
                  </form>
                </div>
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

const mapDispatchToProps = (dispatch, { history }) =>{
  return {
    saveAvatar: (user) => dispatch(editUser(user, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
