import {
CHANGE_CAMPAIGN,
ADD_CAMPAIGN,
ADD_NOTEPAD,
ADD_SUBNOTEPAD,
ADD_NOTE,
UPDATE_NOTE,
DELETE_NOTE
} from '../actions/notes';


export default function notepads(state = {}, action) {
	switch (action.type) {
		case ADD_CAMPAIGN:
			return action.data;
		case CHANGE_CAMPAIGN:
			return action.data;
		case ADD_NOTEPAD:
		case ADD_SUBNOTEPAD:
		case ADD_NOTE:
		case UPDATE_NOTE:
		case DELETE_NOTE:
			return action.data;
		default:
			return state;
	}
}