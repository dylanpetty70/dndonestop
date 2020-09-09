import React, {Component} from 'react';
import Notepad from '../Notes/Notepad';
import PulseLoader from 'react-spinners/PulseLoader';
var firebase = require('firebase/app');
require('firebase/auth')


class CampaignDetails extends Component {

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
				    <Notepad/> :
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
export default CampaignDetails;