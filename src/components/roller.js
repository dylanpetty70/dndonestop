import React, {Component} from 'react';
import ReactDice from './reactDice';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class Roller extends Component {

	constructor(props){
		super(props);
        this.state = {dice: [], addDice: 20};
		this.dice = this.dice.bind(this);
	}

	dice(){
		let temp = [];
		for(let i = 0; i < this.state.dice.length; i++){
			temp.push(<ReactDice key={i} sides={this.state.dice[i]} rollSeconds='.75'/>)
		}
		return temp;
	}

    addDice(){
        let temp = this.state.dice;
        temp.push(this.state.addDice);
        this.setState({...this.state, dice: temp});
	}

	render(){
		return(
            <div>
				<Card>
					<Card.Header>
						<Form inline>
                          <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            onChange={(text) => {this.setState({...this.state, addDice: text.target.value})}}
                            defaultValue={20}
                          >
                            <option value={2}>d2</option>
                            <option value={4}>d4</option>
                            <option value={6}>d6</option>
                            <option value={8}>d8</option>
                            <option value={10}>d10</option>
                            <option value={20}>d20</option>
                            <option value={100}>d100</option>
                          </Form.Control>
                          
                          <Button variant="outline-success" onClick={() => {this.addDice()}}>
                            Add Dice
                          </Button>
                          
                          <Button variant="outline-danger" style={{marginLeft: '10px'}} onClick={() => {this.setState({...this.state, dice: []})}}>
                            Clear
                          </Button>
                        </Form>
					</Card.Header>
					<Card.Body>
                        <CardDeck>
						{this.dice()}
                        </CardDeck>
					</Card.Body>
				</Card>
            </div>
		)
	}
}


export default Roller;

//<ReactDice sides='20' rollSeconds='1' /> 