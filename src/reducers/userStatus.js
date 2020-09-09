import {HANDLE_USER_STATUS} from '../actions/user';


export default function user(state = false, action) {
	switch (action.type) {
		case HANDLE_USER_STATUS: 
			return action.bool;
		default:
			return state;
	}
}