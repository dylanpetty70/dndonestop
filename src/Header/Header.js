import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Roller from '../components/roller';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup'


class Header extends Component {

	constructor(props){
		super(props);
        this.state = {showDice: false};
	}

	render(){
		return(
			<div className="App">
				<Navbar collapseOnSelect expand="lg" style={{backgroundColor: '#8b3a3a'}}>
                  <Navbar.Brand href="/" style={{color: 'white'}}>DND One Stop</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      {(this.props.userStatus === true) ?
                      <><Nav.Link href="/" style={{color: 'white'}}>Game Info</Nav.Link>
                      <Nav.Link href="/createenv" style={{color: 'white'}}>Create Environment</Nav.Link>
                      <Nav.Link href="/characterinfo" style={{color: 'white'}}>Character Info</Nav.Link>
                      <Nav.Link href="/campaigndetails" style={{color: 'white'}}>Campaign Details</Nav.Link>
                       <ButtonGroup toggle className="mb-2" style={{color: 'white', position: 'absolute', top: '10px', left: '675px'}}>
							<ToggleButton
							  type="checkbox"
							  variant="secondary"
							  checked={this.state.showDice}
							  value='1'
							  onChange={() => this.setState({...this.state, showDice: !this.state.showDice})}
							>
							  Toggle Dice Roller
							</ToggleButton>
						</ButtonGroup></>
                       : <></>}
                    </Nav>
                    <Nav>
                      <Nav.Link href="/login" style={{color: 'white'}}>Log In</Nav.Link>
                      {(this.props.userStatus.status === true) ?
                      <Nav.Link style={{color: 'white'}} ><div style={{paddingLeft: '30px',color: 'white'}}>Hello, {this.props.user.firstName}</div></Nav.Link>
                      :<></>}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <div style={{right: '0', position: 'absolute', margin: '10px', maxWidth: '300px',color: 'white', zIndex: '3000'}}>
			        {(this.state.showDice) ? <Roller /> : <></>}
			    </div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		userStatus: state.userStatus,
        user: state.user,
	}
}

export default connect(mapStateToProps)(Header);