import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux'
import {fetchUsers} from './store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UpdateUser  from './UpdateUserPermissionModal'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import DeleteUserModal from './DeleteUserModal'
import DeleteProductModal from './DeleteProductModal'
import UpdateProduct from './UpdateProduct'
import AddProduct from './AddProduct'
import LineGraphChart from './LineGraphChart'
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
    const path = this.props.pathname
    const amount =  this.props.users.length
    const { books } = this.props.books
    return (
      <div>
        <div> 
          <div style={{marginLeft: '10px'}}>
          <AddProduct />
          </div>
          <div>
            <Tabs
              defaultActiveKey="Users"
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
          <Table hover style={{marginTop: '-17px', 
                    backgroundColor: 'white', 
                    borderLeft: 'thin solid #dadce5',
                    borderRight: 'thin solid #dadce5', borderTop: 'thin solid #dadce5', borderBottom: 'thin solid #dadce5 !important'
                  }}>
            <thead style={{backgroundColor: '#D3D3D3'}}>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email </th>
                <th>Adminnß</th>
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
                        <td style={{textAlign: 'center', verticalAlign: 'middle', display: 'flex', justifyContent: 'center'}}>
                          <UpdateUser user={user}/>
                          <DeleteUserModal user={user.firstName} userId={user.id}/>
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
              <Tab eventKey="Products"title={
                  <React.Fragment>
                    Products
                    <Badge style={{ marginLeft: '7px'}}variant='light'>{this.props.books.length}</Badge>
                  </React.Fragment>
                }>
              <Table hover style={{marginTop: '-17px', 
                    backgroundColor: 'white', 
                    borderLeft: 'thin solid #dadce5',
                    borderRight: 'thin solid #dadce5', borderTop: 'thin solid #dadce5', borderBottom: 'thin solid #dadce5 !important'
                  }}>
              <thead style={{backgroundColor: '#D3D3D3'}}>
                <tr>
                  <th>Title</th>
                  <th>Author </th>
                  <th>Price</th>
                  <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Update </th>
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
                          <td style={{textAlign: 'center', verticalAlign: 'middle', display: 'flex', justifyContent: 'center'}}>
                            <UpdateProduct product={book}/>
                            <DeleteProductModal product={book}/>
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
            <Tab 
                eventKey="Analytics" 
                title={
                  <React.Fragment>
                    Analytics
                  </React.Fragment>
                }>
                  <LineGraphChart />
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