
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

class AddEditForm extends React.Component {
  state = {
    id: 0,
    firstName: '',
    lastName: '',
    address: '',
    email: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = async e => {
    e.preventDefault()

    var res = await axios({
        method: 'post',
        url: 'https://localhost:5001/api/Users',
        data: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            email: this.state.email,
          }
      });
  
      if(res.status === 200 && res.data.success){
        let user = res.data.returnValue;
        this.props.addItemToState(user)
        this.props.toggle()
      }
  }

  submitFormEdit = async e => {
    e.preventDefault()

    var res = await axios({
        method: 'put',
        url: 'https://localhost:5001/api/Users/'+this.state.id,
        data: {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            email: this.state.email
          }
      });
  
      if(res.status === 200 && res.data.success){
        let user = res.data.returnValue;
        this.props.updateState(user)
        this.props.toggle()
      }
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.user){
      const { id, firstName, lastName, address, email } = this.props.user
      this.setState({ id, firstName, lastName, address, email })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.user ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" id="firstName" onChange={this.onChange} value={this.state.firstName === null ? '' : this.state.firstName} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" name="lastName" id="lastName" onChange={this.onChange} value={this.state.lastName === null ? '' : this.state.lastName}  />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address}  placeholder="Address" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm