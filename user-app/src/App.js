import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"
import axios from 'axios'

class App extends Component {
  state = {
    users: []
  }

  async getItems(){
    var res = await axios({
      method: 'get',
      url: 'https://localhost:5001/api/Users'
    });

    if(res.status === 200 && res.data.success){
      let users = res.data.returnValue;
      this.setState({users})
    }
  }

  addItemToState = (user) => {
    this.setState(prevState => ({
      users: [...prevState.users, user]
    }))
  }

  updateState = (user) => {
    const itemIndex = this.state.users.findIndex(data => data.id === user.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.users.slice(0, itemIndex),
    // add the updated item to the array
      user,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.users.slice(itemIndex + 1)
    ]
    this.setState({ users: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedUsers = this.state.users.filter(user => user.id !== id)
    this.setState({ users: updatedUsers })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>User Database</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable users={this.state.users} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.users}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add User" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App