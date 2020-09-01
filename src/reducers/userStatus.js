import {CHECK_PASSWORD} from '../actions/user';
import {NEW_USER} from '../actions/user';


export default function user(state = '', action) {
	switch (action.type) {
		case CHECK_PASSWORD:
			return action.check;
		case NEW_USER:
			return ((action.status === 200) ? true : false);
		default:
			return state;
	}
}