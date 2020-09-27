import React, {Component} from 'react';
import { connect } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';


class Scanners extends Component {



	render(){
		return(
			<div className="App">
				<Jumbotron fluid>
				  <Container>
					<h1>Webpage Currently in Progress</h1>
					<p>
					  This feature of the site is currently under development. Clicks on currently developing features are recorded, with the most clicked features being highest priority.
					</p>
				  </Container>
				</Jumbotron>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		
	}
}

export default connect(mapStateToProps)(Scanners);