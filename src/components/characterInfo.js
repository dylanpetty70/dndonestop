import React, {Component} from 'react';
import CharacterSheet from './characterSheet';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {handleUpdateNewCharacter, handleGrabCharacters} from '../actions/characters';

class CharacterInfo extends Component {

    constructor(props){
		super(props);
        this.state = {character: '',
                        showNew: false,
                        characterName: '',
                        };
        this.characterOptions = this.characterOptions.bind(this);
	}

    componentDidMount(){
        this.props.handleGrabCharacters();
    }

    characterOptions(){
        let temp = [];
        for(var key in this.props.dndInfo.characters){
              temp.push(<option value={key} key={key}>{key}</option>)
		}
        return temp;
	}

    newCharacter(){
         return(
              <Modal
                show={this.state.showNew}
                onHide={() => {this.setState({showNew: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>New Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="container">
                        <Form.Group controlId="characterName">
                        <Form.Label>Character Name</Form.Label>
                        <Form.Control type="username" placeholder="Enter Character Name" onChange={(text) => {this.setState({...this.state, characterName: text.target.value})}}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({showNew: false}); this.props.handleUpdateNewCharacter(this.state.characterName);}}>
                        Create New User
                    </Button>
                    <Button variant="secondary" onClick={() => {this.setState({showNew: false})}}>
                    Cancel
                    </Button>
                </Modal.Footer>
                </Modal>     
	     )
	}

	render(){
		return(
            <div>
                {this.newCharacter()}
				<Form inline style={{margin: '20px'}}>
                    <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    onChange={(text) => {this.setState({...this.state, character: text.target.value})}}
                    defaultValue={''}
                    custom
                    >
                    <option value='' disable='true'>Choose Character</option>
                    {this.characterOptions()}
                    </Form.Control>
                    <Button variant="outline-secondary" style={{marginLeft: '10px'}} onClick={() => {this.setState({...this.state, showNew: true})}}>
                        New Character
                    </Button>
                </Form>
				{(this.state.character !== '') ? <CharacterSheet name={this.state.character} character={this.props.dndInfo.characters[this.state.character]}/> : <></>}
            </div>
		)
	}
}

const mapStateToProps = state => {
	return{
        dndInfo: state.dndInfo,
	}
}

export default connect(mapStateToProps, {
	handleUpdateNewCharacter,
    handleGrabCharacters,
})(CharacterInfo);