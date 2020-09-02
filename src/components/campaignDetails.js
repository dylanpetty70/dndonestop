import React, {Component} from 'react';
import Notepad from './Notes/Notepad';
import WIP from './WIP';

class CampaignDetails extends Component {

	render(){
		return(
            <div>
			<WIP />
				<Notepad/>
            </div>
		)
	}
}


export default CampaignDetails;