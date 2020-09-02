import {EDIT_TOKENS} from '../actions/editEnv';



export default function editEnv(state = {tokens: false}, action) {
	switch (action.type) {
		case EDIT_TOKENS:
			state.tokens = action.data;
			return state;
		default:
			return state;
	}
}