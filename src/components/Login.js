import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleCheckPassword, handleNewUser } from '../actions/user';


class Login extends Component {

	constructor(props){
		super(props);
        this.state = {show: false,
                        username: '',
                        password: '',
                        showNew: false,
                        newUsername: '',
                        newPassword: '',
                        newFirstName: '',
                        newLastName: ''};
        this.login = this.login.bind(this);
        this.newUser = this.newUser.bind(this);
	}

    login() {
         if(this.props.userStatus === true) {
            return(
                <Modal
                show={this.state.show}
                onHide={() => {this.setState({show: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Yay!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You've successfully logged in!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({show: false})}}>Continue</Button>
                </Modal.Footer>
                </Modal>     
			)
		 } else if(this.props.userStatus === false){
            return(
                <Modal
                show={this.state.show}
                onHide={() => {this.setState({show: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Boo!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    If you don't know what you're doing, just stop
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({show: false})}}>Continue</Button>
                </Modal.Footer>
                </Modal>     
			)  
		 } else {
            return (<div></div>)  
		 }
	}

    newUser(){
        if(this.state.showNew) {
            return(
                <Modal
                show={this.state.showNew}
                onHide={() => {this.setState({showNew: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter Username" onChange={(text) => {this.setState({...this.state, newUsername: text.target.value})}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter First Name" onChange={(text) => {this.setState({...this.state, newFirstName: text.target.value})}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter Last Name" onChange={(text) => {this.setState({...this.state, newLastName: text.target.value})}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(text) => {this.setState({...this.state, newPassword: text.target.value})}}/>
                      </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({showNew: false, show: true}); this.props.handleNewUser(this.state.newUsername, this.state.newFirstName, this.state.newLastName, this.state.newPassword);}}>
                        Create New User
                    </Button>
                    <Button variant="secondary" onClick={() => {this.setState({showNew: false});}}>
                    Cancel
                    </Button>
                </Modal.Footer>
                </Modal>     
			)
		 } else {
            return (<div></div>)  
		 }
	}


	render(){
		return(
			<div>
            {this.login()}
            {this.newUser()}
			<div className="App" style={{marginTop: '20px'}}>
				<Form className="container">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter Username" onChange={(text) => {this.setState({...this.state, username: text.target.value})}}/>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(text) => {this.setState({...this.state, password: text.target.value})}}/>
                  </Form.Group>
                  <Button variant="primary" onClick={() => {this.setState({show: true}); this.props.handleCheckPassword(this.state.username, this.state.password);}}>
                    Login
                  </Button>
                  <Button variant="outline-dark" style={{marginLeft: '30px'}} onClick={() => {this.setState({showNew: true})}}>
                    New User
                  </Button>
                </Form>
			</div>
            </div>
		)
	}
}

const mapStateToProps = state => {
	return{
		user: state.user,
        userStatus: state.userStatus,
	}
}

export default connect(mapStateToProps, {
    handleCheckPassword,
    handleNewUser,
})(Login);