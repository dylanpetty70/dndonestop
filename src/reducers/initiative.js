import {NEW_INITIATIVE, DELETE_INITIATIVE, UPDATE_INITIATIVE, GRAB_INITIATIVE, CHANGE_INITIATIVE_SHOW} from '../actions/initiative';




export default function initiative(state = {show: false, initiatives: {}}, action) {
	switch (action.type) {
		case NEW_INITIATIVE:
		case DELETE_INITIATIVE:
		case UPDATE_INITIATIVE:
		case GRAB_INITIATIVE:
			return state;
		case CHANGE_INITIATIVE_SHOW:
			state.show = !state.show;
			return state;
		default:
			return state;
	}
}