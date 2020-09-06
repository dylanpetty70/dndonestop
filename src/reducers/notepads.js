import {
CHANGE_CAMPAIGN,
ADD_CAMPAIGN,
ADD_NOTEPAD,
ADD_SUBNOTEPAD,
ADD_NOTE,
UPDATE_NOTE,
DELETE_NOTE,
DELETE_NOTEPAD,
DELETE_SUBNOTEPAD,
} from '../actions/notes';


export default function notepads(state = {}, action) {
	switch (action.type) {
		case ADD_CAMPAIGN:
		case CHANGE_CAMPAIGN:
		case ADD_NOTEPAD:
		case ADD_SUBNOTEPAD:
		case ADD_NOTE:
		case UPDATE_NOTE:
		case DELETE_NOTE:
		case DELETE_NOTEPAD:
		case DELETE_SUBNOTEPAD:
			let temp = {};
			if(Object.keys(action.data).length < 1){
				temp = {'Placeholder Campaign': ''}
			} else {
				temp = action.data
			}
			if(Object.keys(temp).includes('creator')){
				delete temp['creator'];
			}
			if(Object.keys(temp).includes('shared')){
				delete temp['shared'];
			}
			if(Object.keys(temp).length === 0){
				temp['First Tab'] = [{subnotepad: 'First Page', notes: []}];
			}
			return temp;
		default:
			return state;
	}
}