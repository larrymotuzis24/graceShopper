import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editUser } from './store';
import Button from 'react-bootstrap/Button';
class User extends Component {
  constructor() {
    super();
    this.state = {
      avatar: '',
    };
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    // this.el.addEventListener('change', (ev) =>{
    //   const file = ev.target.files[0];
    //   const reader = new FileReader();
    //   reader.addEventListener('load', () =>{
    //     this.setState({avatar: reader.result})
    //   })
    //   reader.readAsDataURL(file);
    // })
  }

  save(ev) {
    ev.preventDefault();
    const user = {
      id: this.props.auth.id,
      imageUrl: this.state.avatar,
    };
    this.props.saveAvatar(user);
  }

  render() {
    const { auth, match } = this.props;
    const path = match.path;
    const { avatar } = this.state;
    const { save } = this;
    return (
      <main className="container mt-4" style={{ minHeight: '75vh' }}>
        <h2 style={{}}>Account Details</h2>
        <div className="w-100 row row-cols-2 g-4 justify-content-between">
          <div className="mt-5 col-md-6" style={{}}>
            <h6 className="mb-3"> Personal Information </h6>
            <hr />
            <div className="" style={{}}>
              {path === '/user' ? (
                <div className="flex-column">
                  <div className="d-flex align-items-center my-4">
                    {!avatar ? (
                      <img
                        style={{
                          width: '8rem',
                          height: '8rem',
                          borderRadius: '1000px',
                        }}
                        src={auth.imageUrl}
                      />
                    ) : (
                      <img
                        src={avatar}
                        style={{
                          width: '8rem',
                          height: '8rem',
                          borderRadius: '1000px',
                        }}
                      />
                    )}

                    <div className="ms-3">
                      <p style={{}}>
                        {auth.firstName} {auth.lastName}
                        <br />
                        {auth.email}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <a
                    href="#editUser"
                    className="btn btn-light border-dark mb-4 mt-3"
                  >
                    EDIT INFORMATION
                  </a>
                  <br />
                  <a href="#passwordUser" className="btn btn-dark">
                    CHANGE PASSWORD
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-5 col-md-6" style={{}}>
            <h6 className="mb-3">Addresses</h6>
            <hr />
            <div className="my-4">
              {auth.address}
              <br />
              {auth.city}, {auth.state}
              <br />
              {auth.zipCode}
            </div>
            <hr />
            {auth.secondaryAddress
              ? auth.secondaryAddress.map((address) => {
                  return (
                    <div key={address.id} className="my-4">
                      <div className="mb-4">{address}</div>
                      <hr />
                    </div>
                  );
                })
              : null}
            <a
              className="btn btn-light border-dark mb-4 mt-3"
              href="#addressUser"
            >
              ADD SHIPPING ADDRESS
            </a>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    saveAvatar: (user) => dispatch(editUser(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
