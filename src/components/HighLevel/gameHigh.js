import React, {Component} from 'react';
import GameInfo from '../gameInfo';
import PulseLoader from 'react-spinners/PulseLoader';
var firebase = require('firebase/app');
require('firebase/auth')


class GameHigh extends Component {

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
				    <GameInfo/> :
                    <PulseLoader
                      css={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                      size={150}
                      color={"#123abc"}
                      loading={true}
                    />
                }
                
            </div>
		)
	}
}
export default GameHigh;