import {NEW_CHARACTER} from '../actions/characters';
import {UPDATE_5E} from '../actions/5eInfo';
import {GRAB_5E} from '../actions/5eInfo';
import {SAVE_CHARACTER} from '../actions/characters';


export default function dndInfo(state = {}, action) {
	switch (action.type) {
		case NEW_CHARACTER:
		case SAVE_CHARACTER:
			return {...state, characters: action.data}
		case UPDATE_5E:
		case GRAB_5E:
			return {...state, generalInfo: action.data}
		default:
			return state;
	}
}