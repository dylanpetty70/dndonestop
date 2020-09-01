import React, {Component} from 'react';
import Notepad from './Notes/Notepad';

class CampaignDetails extends Component {

	render(){
		return(
            <div>
			<h2 style={{zIndex: '100', position: 'absolute', top: '135px', left: '600px'}}>Still In Progress. May Bug Out.</h2>
				<Notepad/>
            </div>
		)
	}
}


export default CampaignDetails;