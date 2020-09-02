import {GRAB_NAMES} from '../actions/user';

export default function userNames(state = [], action) {
	switch (action.type) {
		case GRAB_NAMES:
			return action.data;
		default:
			return state;
	}
}