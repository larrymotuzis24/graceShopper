import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editUser } from "./store";
import  Button  from 'react-bootstrap/Button'
class User extends Component {
  constructor(){
    super();
    this.state = {
      avatar: ''
    }
    this.save = this.save.bind(this);
  }

  componentDidMount(){
    // this.el.addEventListener('change', (ev) =>{
    //   const file = ev.target.files[0];
    //   const reader = new FileReader();
    //   reader.addEventListener('load', () =>{
    //     this.setState({avatar: reader.result})
    //   })
    //   reader.readAsDataURL(file);
    // })
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
        <h2 style={{
          marginRight: '83%',
          whiteSpace: 'nowrap',
          marginLeft: '750px'
        }}>
         Account Details
        </h2>
        <div style={{
          height: '63vh'
        }}>
          <div style={{
            marginTop: '60px'
          }}>
            <div style={{display: 'inline-block', marginLeft: '750px'}}>
              <h6 style={{
              borderBottom: '1px solid black'
            }}> Personal Information </h6>
              <div className='display-line-item'
                style={{
                  marginTop: '40px'
                }}
              >
                   {path === "/user" ? (
                        <div>
                            <div>
                              <div style={{display: 'inline-block'}}>
                                  { !avatar ? <img 
                                      style={{
                                        marginTop: '-382px',
                                        borderRadius: '50%',
                                        height: '300px',
                                        width: '300px',
                                        marginRight: '50px'
                                      }}
                                      src={auth.imageUrl}/> : 
                                  <img 
                                    src={ avatar }
                                      style={{
                                        marginTop: '-304px',
                                        borderRadius: '50%',
                                        height: '300px',
                                        width: '300px',
                                        marginRight: '50px'
                                      }}
                                  />}
                              </div>
                              <div style={{display: 'inline-block'}}>
                                  <h6 >First Name</h6>
                                  <p style={{
                                    fontSize: '25px'
                                  }}>{auth.firstName}</p>
                                  <h6 >Last Name</h6>
                                  <p style={{
                                    fontSize: '25px'
                                  }}>{auth.lastName}</p>
                                  <h6>Address</h6>
                                  <p style={{
                                    fontSize: '25px'
                                  }}>{auth.address}</p>
                                  <h6>Email</h6>
                                  <p style={{
                                    fontSize: '25px'
                                  }}>{auth.email}</p>
                              </div>
                          </div>
                          <Button style={{
                            marginBottom: '20px',
                            color: 'white'
                          }}
                          variant='primary'
                          >
                              <Link to="/editUser">Edit Personal Information</Link>
                          </Button>
                          <br/>
                          <Button
                            variant='secondary'
                            style={{
                              color: 'white !important'
                            }}
                          >
                              <Link to="/passwordUser">Change Password</Link>
                          </Button>
                      </div>
                      ) : null}
              </div>
          </div>
          <div style={{display: 'inline-block', float: 'right', marginRight: '1050px'}}>
            <h6 style={{
              borderBottom: '1px solid black'
            }}>  Addresses  </h6>
                {auth.secondaryAddress ?  auth.secondaryAddress.map(address => {
                  return (
                    <div key={address.id} className='display-lineitem' style={{
                      marginTop: '40px'
                    }}>
                      <p style={{
                         fontSize: '25px'
                         }}> 
                         {address}
                      </p>
                    </div>
                  )
                }) : null}
                 <Button style={{
                            marginBottom: '20px',
                            color: 'white'
                          }}
                          variant='primary'
                          >
                              <Link to="/addressUser">Add a new Shipping Address</Link>
                    </Button>
                </div>
            </div>
          </div>
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
