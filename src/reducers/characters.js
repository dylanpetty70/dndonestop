import {GRAB_CHARACTERS} from '../actions/characters';
import {GRAB_CHARACTER_OPTIONS} from '../actions/characters';

export default function characters(state = {options: {}, character: {}, key: ''}, action) {
	switch (action.type) {
		case GRAB_CHARACTERS:
			return {...state, character: action.data, key: action.id}
		case GRAB_CHARACTER_OPTIONS:
			return {...state, options: action.data};
		default:
			return state;
	}
}