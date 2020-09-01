import {NEW_CHARACTER} from '../actions/characters';
import {SAVE_CHARACTER} from '../actions/characters';


export default function characters(state = {}, action) {
	switch (action.type) {
		case NEW_CHARACTER:
		case SAVE_CHARACTER:
			return {...state, characters: action.data}
		default:
			return state;
	}
}