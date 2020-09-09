import {
GRAB_CAMPAIGN_OPTIONS , GRAB_CAMPAIGN
} from '../actions/notes';


export default function notepads(state = {options: {}, campaign: {}, key: ''}, action) {
	switch (action.type) {
		case GRAB_CAMPAIGN:
			return {...state, campaign: action.data, key: action.id};
		case GRAB_CAMPAIGN_OPTIONS:
			return {...state, options: action.data}
		default:
			return state;
	}
}