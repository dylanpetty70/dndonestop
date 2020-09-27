import React, {Component} from 'react';
import { connect } from 'react-redux';
import {handleUpdateNewCharacter} from '../../actions/characters';
import WIP from '../WIP';


class CharacterInfo extends Component {

    constructor(props){
		super(props);
        this.state = {
                        };
	}
    


	render(){
		return(
            <div>
                <WIP/>
            </div>
		)
	}
}

const mapStateToProps = state => {
	return{
        characters: state.characters,
        optionsLength: state.characters.options.length
	}
}

export default connect(mapStateToProps, {
	handleUpdateNewCharacter
})(CharacterInfo);