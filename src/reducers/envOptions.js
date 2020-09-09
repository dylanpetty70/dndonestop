import {CHANGE_GRID} from '../actions/draggable';


export default function envOptions(state ={color: 'black'}, action) {
	switch (action.type) {
		case CHANGE_GRID:
			return action.data;
		default:
			return state;
	}
}