import {UPDATE_5E} from '../actions/5eInfo';
import {GRAB_5E} from '../actions/5eInfo';


export default function dndInfo(state = {}, action) {
	switch (action.type) {
		case UPDATE_5E:
		case GRAB_5E:
			return {...state, generalInfo: action.data}
		default:
			return state;
	}
}