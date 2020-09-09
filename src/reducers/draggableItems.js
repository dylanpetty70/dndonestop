import {GRAB_ALL_OPTIONS} from '../actions/draggable';


export default function draggableItems(state = {}, action) {
	switch (action.type) {
		case GRAB_ALL_OPTIONS:
			return action.data;
		default:
			return state;
	}
}