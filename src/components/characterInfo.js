import React, {Component} from 'react';
import CharacterSheet from './characterSheet';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {handleUpdateNewCharacter, handleGrabCharacter} from '../actions/characters';


class CharacterInfo extends Component {

    constructor(props){
		super(props);
        this.state = {character: '',
                        showNew: false,
                        characterName: '',
                        showDelete: false
                        };
        this.updateChar = this.updateChar.bind(this);
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
                        Create
                    </Button>
                    <Button variant="secondary" onClick={() => {this.setState({showNew: false})}}>
                    Cancel
                    </Button>
                </Modal.Footer>
                </Modal>     
	     )
	}

    updateChar(character){
        for(let i = 0; i < Object.values(this.props.characters.options).length; i++){
            if(Object.values(this.props.characters.options)[i] === character){
                this.props.handleGrabCharacter(Object.keys(this.props.characters.options)[i]);
			}  
		}
	}


	render(){
		return(
            <div>
                {this.newCharacter()}
				<Form inline style={{margin: '20px'}}>
                    <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    onChange={(text) => {this.setState({...this.state, character: text.target.value}); this.updateChar(text.target.value);}}
                    defaultValue={''}
                    custom
                    >
                    <option value='' disable='true'>Choose Character</option>
                    {Object.values(this.props.characters.options).map((element) => {
                        return(<option value={element} key={element}>{element}</option>)           
					})}
                    </Form.Control>
                    <Button variant="outline-secondary" style={{marginLeft: '10px'}} onClick={() => {this.setState({...this.state, showNew: true})}}>
                        New Character
                    </Button>
                </Form>
				{(this.state.character !== '') ? <CharacterSheet name={this.state.character}/>
                : <></>}
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
	handleUpdateNewCharacter,
    handleGrabCharacter
})(CharacterInfo);