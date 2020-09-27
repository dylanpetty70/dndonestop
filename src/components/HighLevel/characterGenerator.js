import React, {Component} from 'react';
import { connect } from 'react-redux';
import Starter from '../characterGen/starter';
import PulseLoader from 'react-spinners/PulseLoader';
var firebase = require('firebase/app');
require('firebase/auth')


class CharacterGenerator extends Component {

	constructor(props){
		super(props);
        this.state = {status: false};
	}

	componentDidMount(){

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({...this.state, status: true});
          } else {
            this.setState({...this.state, status: false});
          }
        });

	}

	render(){
		return(
            <div>
                {(this.state.status) ?
				    <Starter/> :
                    <PulseLoader
                      css={{position: 'absolute', top: '40vh', left: '40vw'}}
                      size={100}
                      color={"#123abc"}
                      loading={true}
                    />
                }
                
            </div>
		)
	}
}
const mapStateToProps = state => {
	return{
		dndInfo: state.dndInfo,
        characters: state.characters
	}
}

export default connect(mapStateToProps, {})(CharacterGenerator);
