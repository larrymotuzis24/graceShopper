import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux'
import {fetchUsers} from './store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  UpdateUserPermissionModal  from './UpdateUserPermissionModal'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';

class IsAdminPanel extends Component {
 constructor(){
  super()
  this.state = {
    theUsers: '',
    books: ''
  }
 }

 componentDidMount(){
  try {
    this.props.load()
    this.setState({ theUsers: this.props.users })
    this.setState({ books: this.props.books })
  }
  catch(err){
      console.log(err)
  }
}
componentDidUpdate(prevProps){
  if (prevProps.users.length !== this.props.users.length){
    this.setState({ theUsers: this.props.users })
  }
  if (prevProps.books.length === 0 && this.props.books.length > 0){
    this.setState({ books: this.props.books })
  }
}
  render() {
    const path = this.props.pathname
    const amount =  this.state.theUsers.length
    const { books } = this.props.books
    console.log('books', this.props.books)
    return (
      <div>
        <div> 
          <div>
            <Tabs
              defaultActiveKey="Users"
              // id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab 
                eventKey="Users" 
                title={
                  <React.Fragment>
                    Users
                    <Badge style={{ marginLeft: '7px'}}variant='light'>{amount}</Badge>
                  </React.Fragment>
                }>
                   <Table bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email </th>
                <th>Admin</th>
                <th style={{textAlign: 'center', verticalAlign: 'middle'}}> Update </th>
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
                  <td>No users to show here</td>
                  </tr>
                </>
              }
            </tbody>
          </Table>
              </Tab>
              <Tab eventKey="Products"title={
                  <React.Fragment>
                    Products
                    <Badge style={{ marginLeft: '7px'}}variant='light'>{this.props.books.length}</Badge>
                  </React.Fragment>
                }>
              <Table bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author </th>
                  <th>Price</th>
                  <th>Update </th>
                </tr>
              </thead>
              <tbody>
              {this.props.books.length > 1 ? 
                  this.props.books.map(book => {
                    return (
                        <tr key={book.id}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.price}</td>
                          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <UpdateUserPermissionModal/>
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
            </Tab>
          </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
const mapState = (state, otherParams) => {
  const pathname = otherParams.match.path
  return {
    users: state.users || {},
    books: state.books,
    pathname
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