import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';

export default class isAdminPanel extends Component {
  render() {
    return (
      <div>
        <div> 
            <h2>  Users  </h2> 
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>Yes/No</td>
        </tr>
      </tbody>
    </Table>
      </div>
    )
  }
}
