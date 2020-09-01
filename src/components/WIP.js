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
					<h1>Website Currently in Progress</h1>
					<p>
					  Check back for more updates!
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