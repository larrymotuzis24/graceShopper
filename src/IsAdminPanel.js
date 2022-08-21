import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux'
import {fetchUsers} from './store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  UpdateUserPermissionModal  from './UpdateUserPermissionModal'
import axios from 'axios'
class IsAdminPanel extends Component {
 constructor(){
  super()
  this.state = {

  }
 }

 componentDidMount(){
  try {
    this.props.load()
  }
  catch(err){
      console.log(err)
  }
}
  render() {
    return (
      <div>
        <div> 
            <h4>  Users {this.props.users.length -1} </h4> 
        </div>
        <Table bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email </th>
          <th>Admin</th>
          <th style={{textAlign: 'center', verticalAlign: 'middle'}}> Update Permission </th>
        </tr>
      </thead>
      <tbody>
          {this.props.users.length > 1 ? 
          this.props.users.map(user => {
            return (
                
                 <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'True' : 'False'}</td>
                  <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <UpdateUserPermissionModal user={user.id}/>
                  </td>
                  </tr>
            )
          })
          : 
          <>
          <tr>
            <td>No users to show</td>
            </tr>
          </>
        }
      </tbody>
    </Table>
      </div>
    )
  }
}
const mapState = (state) => {
  return {
    users: state.users || {}
  }
}

const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(IsAdminPanel)