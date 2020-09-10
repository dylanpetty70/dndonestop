import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleFirebaseCreateUser} from '../actions/user';
import {handleUserStatus} from '../actions/user';
var firebase = require('firebase/app');
require('firebase/auth')

class Login extends Component {

	constructor(props){
		super(props);
        this.state = {showSuccess: false,
                        showFail: false,
                        email: '',
                        password: '',
                        showNew: false,
                        newEmail: '',
                        newPassword: '',
                        newFirstName: '',
                        newLastName: ''};
        this.loginSuccess = this.loginSuccess.bind(this);
        this.loginFail = this.loginFail.bind(this);
        this.newUser = this.newUser.bind(this);
        this.signIn = this.signIn.bind(this);
        this.createUser = this.createUser.bind(this);
	}

    componentDidMount(){
        if(firebase.auth().currentUser){
            firebase.auth.signOut();  
            this.props.handleUserStatus(false);
		} else {
            this.props.handleUserStatus(false);  
		}
	}

    loginSuccess(){
        return(
            <Modal
            show={this.state.showSuccess}
            onHide={() => {this.setState({showSuccess: false})}}
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
                <Button variant="primary" onClick={() => {this.setState({showSuccess: false}); window.location.href = "/";}}>Continue</Button>
            </Modal.Footer>
            </Modal>     
		)
	}

    loginFail(){
        return(
            <Modal
            show={this.state.showFail}
            onHide={() => {this.setState({showFail: false})}}
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
                <Button variant="primary" onClick={() => {this.setState({showFail: false})}}>Continue</Button>
            </Modal.Footer>
            </Modal> 
        )
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={(text) => {this.setState({...this.state, newEmail: text.target.value})}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicfirstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter First Name" onChange={(text) => {this.setState({...this.state, newFirstName: text.target.value})}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasiclastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter Last Name" onChange={(text) => {this.setState({...this.state, newLastName: text.target.value})}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onKeyPress={(event) => {if(event.charCode===13){event.preventDefault(); this.createUser()}}} onChange={(text) => {this.setState({...this.state, newPassword: text.target.value})}}/>
                      </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.createUser()}}>
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

    createUser(){
         this.setState({showNew: false}); 
         firebase.auth().createUserWithEmailAndPassword(this.state.newEmail, this.state.newPassword)
            .then((result) => {
                this.props.handleFirebaseCreateUser(result.user.uid, this.state.newFirstName);
                firebase.auth().signInWithEmailAndPassword(this.state.newEmail, this.state.newPassword)
                this.props.handleUserStatus(true);
                this.setState({...this.state, showSuccess: true})
			})
            .catch(function(error) {
                    // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak.');
                  } else {
                    alert(errorMessage);
                  }
            });
	}

    signIn(){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.handleUserStatus(true);
                this.setState({...this.state, showSuccess: true})
            })
            .catch(function(error) {
                var errorMessage = error.message;
                alert(errorMessage);
            });
          
	}


	render(){
		return(
			<div>
            {this.loginSuccess()}
            {this.loginFail()}
            {this.newUser()}
			<div className="App" style={{marginTop: '20px'}}>
				<Form className="container">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" onChange={(text) => {this.setState({...this.state, email: text.target.value})}}/>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onKeyPress={(event) => {if(event.charCode===13){event.preventDefault(); this.signIn()}}} onChange={(text) => {this.setState({...this.state, password: text.target.value})}}/>
                  </Form.Group>
                  <Button variant="primary" onClick={() => {this.signIn()}}>
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
        userStatus: state.userStatus,
	}
}

export default connect(mapStateToProps, {
    handleFirebaseCreateUser,
    handleUserStatus
})(Login);