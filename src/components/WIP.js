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
					  It may bug out. Check back for updates!
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