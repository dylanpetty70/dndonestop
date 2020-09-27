import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleFirebaseCreateUser} from '../actions/user';
import {handleUserStatus} from '../actions/user';
import Card from 'react-bootstrap/Card'
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
			style={{top: String(window.innerHeight/4) + 'px'}}
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
			style={{top: String(window.innerHeight/4) + 'px'}}
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
				style={{top: String(window.innerHeight/4) + 'px'}}
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
                let name = this.state.newFirstName + ' ' + this.state.newLastName;
                this.props.handleFirebaseCreateUser(result.user.uid, name);
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
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
          
	}

    resetPassword(){
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(function() {
                alert('Email Sent')
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
                  <Button variant="outline-danger" style={{marginLeft: '30px'}} onClick={() => {this.resetPassword()}}>
                    Email Password Reset
                  </Button>
                </Form>
                <Card style={{width: '70%', marginTop: '50px', left: '15%'}}>
                    <Card.Body>
                        The D&D information on this site is only the material released through Wizards' <a href="https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf">Open Gaming License</a>. 
                        Additions of more D&D content would violate the terms and conditions. Therefore, there are no plans in the immediate or long-term future to incorporate any source books outside of the approved public content.
                        I think you'll find this content to be worthwhile for anybody playing D&D (just keep your extra sourcebooks handy).
                        In the incorporation of homebrew content, please do not include copyrighted or publicized material that you do not own. When found during scans of copyrighted Wizards content, you will be banned.
                    </Card.Body>
                </Card>
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