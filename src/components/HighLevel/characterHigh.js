import React, {Component} from 'react';
import { connect } from 'react-redux';
import CharacterInfo from '../characterInfo';
import PulseLoader from 'react-spinners/PulseLoader';
import {handleGrabCharacterOptions, handleGrabCharacter} from '../../actions/characters';
var firebase = require('firebase/app');
require('firebase/auth')


class CharacterHigh extends Component {

	constructor(props){
		super(props);
        this.state = {status: false};
	}

	componentDidMount(){
        setTimeout(() => {
            let userId = firebase.auth().currentUser.uid;
            if (userId) {
            this.props.handleGrabCharacterOptions();
            setTimeout(() => {
                if(this.props.characters.options.length < 1){
                    this.props.handleGrabCharacter(this.props.characters.options[0]);
                }
            }, 500)
            this.setState({...this.state, status: true});
            } else {
            this.setState({...this.state, status: false});
            }
		}, 1000)

	}

	render(){
		return(
            <div>
                {(this.state.status) ?
				    <CharacterInfo/> :
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

export default connect(mapStateToProps, {handleGrabCharacterOptions, handleGrabCharacter})(CharacterHigh);
