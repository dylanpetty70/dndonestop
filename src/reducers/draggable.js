import {GRAB_DRAGGABLE} from '../actions/draggable';
import {UPDATE_CURRENT} from '../actions/draggable';
import {NEW_ENVIRONMENT} from '../actions/draggable';
import {CHANGE_SCALE} from '../actions/draggable';
import {DELETE_ENVIRONMENT} from '../actions/draggable';


export default function draggable(state = {}, action) {
	switch (action.type) {
		case GRAB_DRAGGABLE:
		case UPDATE_CURRENT:
			return action.data;
		case NEW_ENVIRONMENT:
			return action.data;
		case CHANGE_SCALE:
			state.scale = action.data;
			return state;
		case DELETE_ENVIRONMENT:
			state.current = [];
			state.scale = '';
			return state;
		default:
			return state;
	}
}