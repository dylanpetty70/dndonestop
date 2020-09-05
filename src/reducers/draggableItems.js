import {GRAB_DRAGGABLE_ITEMS} from '../actions/draggable';


export default function draggableItems(state = {}, action) {
	switch (action.type) {
		case GRAB_DRAGGABLE_ITEMS:
			state = action.data;
			return state;
		default:
			return state;
	}
}