import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Roller from '../components/roller';
import {changeInitiativeShow} from '../actions/initiative';
import Initiative from '../components/TrackInitiative';
import Ambiance from '../components/ambiance';
import ReactModal from 'react-modal-resizable-draggable';
import {AiFillCloseCircle} from 'react-icons/ai';

class Header extends Component {

	constructor(props){
		super(props);
        this.state = {showDice: false, showInitiative: false, name: '', showAmbiance: false};
		this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount(){
		
	}

	openModal() {
        this.setState({showInitiative: true});
    }
    closeModal() {
        this.setState({showInitiative: false});
    }

	render(){
		return(
			<div className="App">
				<Navbar collapseOnSelect expand="lg" style={{backgroundColor: '#8b3a3a', zIndex: 99999}}>
                  <Navbar.Brand href="/" style={{color: 'white'}}><img src='/images/title/logo.png' alt='logo' style={{width: '147px', height: '50px', padding: '0', margin: '0'}}/></Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      {(this.props.userStatus) ? <Nav.Link href="/" style={{color: 'white'}}>Game Info</Nav.Link> : <></>}
                      {(this.props.userStatus) ? <Nav.Link href="/createenv" style={{color: 'white'}}>Playable Grid</Nav.Link> : <></>}
                      {(this.props.userStatus) ? <Nav.Link href="/characterinfo" style={{color: 'white'}}>Character Sheet</Nav.Link> : <></>}
                      {(this.props.userStatus) ? <Nav.Link href="/campaigndetails" style={{color: 'white'}}>Campaign Notes</Nav.Link> : <></>}
                    </Nav>
                    <Nav>
						{(this.props.userStatus) ? <Nav.Link style={{color: 'white'}} onClick={() => {this.setState({...this.state, showDice: !this.state.showDice})}}>Dice Roller</Nav.Link> : <></>}
						{(this.props.userStatus) ? <Nav.Link style={{color: 'white'}} onClick={() => {this.setState({...this.state, showAmbiance: !this.state.showAmbiance})}}>Ambiance</Nav.Link> : <></>}
						{(this.props.userStatus) ? <Nav.Link style={{color: 'white'}} onClick={() => {this.props.changeInitiativeShow(); this.setState({...this.state, showInitiative: !this.state.showInitiative})}}>Initiatives</Nav.Link> : <></>}
						<Nav.Link href="/login" style={{color: 'white'}}>{(this.props.userStatus) ? 'Log Out' : 'Log In'}</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <div style={{right: '0', position: 'absolute', margin: '10px', maxWidth: '300px',color: 'white', zIndex: '30000'}}>
			        {(this.state.showDice) ? <Roller /> : <></>}
			    </div> 
				<ReactModal 
					onRequestClose={() => this.closeModal()}
					isOpen={this.state.showInitiative}>
					<h3 style={{position: 'absolute', zIndex: 3, top: '-6px', right: '2px', cursor: 'pointer'}}><AiFillCloseCircle onClick={() => {this.setState({...this.state, showInitiative: false})}}/></h3>
					<Initiative />
				</ReactModal>
				<ReactModal 
					onRequestClose={() => this.setState({...this.state, showAmbiance: false})}
					isOpen={this.state.showAmbiance}>
					<h3 style={{position: 'absolute', zIndex: 3, top: '-6px', right: '2px', cursor: 'pointer'}}><AiFillCloseCircle onClick={() => {this.setState({...this.state, showAmbiance: false})}}/></h3>
					<Ambiance />
				</ReactModal>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		userStatus: state.userStatus,
        user: state.user,
		initiative: state.initiative,
	}
}

export default connect(mapStateToProps, {changeInitiativeShow})(Header);