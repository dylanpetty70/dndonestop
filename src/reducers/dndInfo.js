import {GRAB_5E} from '../actions/5eInfo';


export default function dndInfo(state = {}, action) {
	switch (action.type) {
		case GRAB_5E:
			return {...state, generalInfo: action.data}
		default:
			return state;
	}
}