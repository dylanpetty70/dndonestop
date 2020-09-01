import {ADD_ITEM} from '../actions/draggable';
import {GRAB_DRAGGABLE} from '../actions/draggable';
import {UPDATE_CURRENT} from '../actions/draggable';
import {NEW_ENVIRONMENT} from '../actions/draggable';
import {CHANGE_SCALE} from '../actions/draggable';


export default function draggable(state = {}, action) {
	switch (action.type) {
		case ADD_ITEM:
			state.items = action.data;
			return state;
		case GRAB_DRAGGABLE:
		case UPDATE_CURRENT:
			return action.data;
		case NEW_ENVIRONMENT:
			return action.data;
		case CHANGE_SCALE:
			state.scale = action.data;
			return state;
		default:
			return state;
	}
}