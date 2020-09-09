import {EDIT_TOKENS} from '../actions/editEnv';



export default function editEnv(state = {tokens: false}, action) {
	switch (action.type) {
		case EDIT_TOKENS:
			return {...state, tokens: action.data};
		default:
			return state;
	}
}