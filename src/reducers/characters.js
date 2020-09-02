import {NEW_CHARACTER} from '../actions/characters';
import {SAVE_CHARACTER} from '../actions/characters';
import {DELETE_CHARACTER} from '../actions/characters';


export default function characters(state = {}, action) {
	switch (action.type) {
		case NEW_CHARACTER:
		case SAVE_CHARACTER:
		case DELETE_CHARACTER:
			return action.data
		default:
			return state;
	}
}