import {GRAB_OPTIONS} from '../actions/draggable';
import {CHANGE_CURRENT_ENV} from '../actions/draggable';
import {NEW_ENVIRONMENT} from '../actions/draggable';
import {GRAB_DRAGGABLE} from '../actions/draggable';
import {DELETE_ENVIRONMENT} from '../actions/draggable';


export default function envOptions(state ={}, action) {
	switch (action.type) {
		case GRAB_OPTIONS:
			state.all = action.data;
			return state;
		case CHANGE_CURRENT_ENV:
			state.current = action.data;
			return state;
		case NEW_ENVIRONMENT:
			state.all = action.options;
			state.current = action.name;
			return state;
		case GRAB_DRAGGABLE:
			state.current = (action.environment === undefined) ? '' : action.environment;
			return state;
		case DELETE_ENVIRONMENT:
			state.all = Object.keys(action.data);
			state.current = '';
			return state;
		default:
			return state;
	}
}