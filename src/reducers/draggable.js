import {GRAB_DRAGGABLE, GRAB_OPTIONS} from '../actions/draggable';

export default function draggable(state = {options: {}, environment: {}, key: ''}, action) {
	switch (action.type) {
		case GRAB_DRAGGABLE:
			return {...state, environment: action.data, key: action.id};
		case GRAB_OPTIONS:
			return {...state, options: action.data};
		default:
			return state;
	}
}