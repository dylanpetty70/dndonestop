import {CHANGE_GRID, CHANGE_BACKGROUND} from '../actions/draggable';


export default function envOptions(state ={color: 'black', background: ''}, action) {
	switch (action.type) {
		case CHANGE_GRID:
			return {...state, color: action.data};
		case CHANGE_BACKGROUND:
			return {...state, background: action.data};
		default:
			return state;
	}
}