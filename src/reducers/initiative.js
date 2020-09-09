import {GRAB_INITIATIVE, GRAB_INITIATIVE_OPTIONS, CHANGE_INITIATIVE_SHOW, DELETE_INITIATIVE} from '../actions/initiative';


export default function initiative(state = {show: false, options: {}, initiative: {}, key: ''}, action) {
	switch (action.type) {
		case GRAB_INITIATIVE:
			return {...state, initiative: action.data, key: action.id};
		case DELETE_INITIATIVE:
			let temp = state.options;
			delete temp[action.id]
			return {...state, options: temp};
		case GRAB_INITIATIVE_OPTIONS:
			return {...state, options: action.data};
		case CHANGE_INITIATIVE_SHOW:
			return {...state, show: !state.show};
		default:
			return state;
	}
}