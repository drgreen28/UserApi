
import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import axios from 'axios'

class DataTable extends Component {

   deleteItem = async id =>  {
    let confirmDelete = window.confirm('Delete user?')
    if(confirmDelete){

        var res = await axios({
            method: 'delete',
            url: 'https://localhost:5001/api/Users/' + id,
        });

        if(res.status === 200 && res.data.success){
            this.props.deleteItemFromState(id);
        }
    }

  }

  render() {

    const users = this.props.users.map(user => {
      return (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.address}</td>
          <td>{user.email}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" user={user} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(user.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Address</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users}
        </tbody>
      </Table>
    )
  }
}

export default DataTable