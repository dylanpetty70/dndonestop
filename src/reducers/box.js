import {UPDATE_BOX} from '../actions/box';


export default function box(state ={}, action) {
	switch (action.type) {
		case UPDATE_BOX:
			return action.data;
		default:
			return state;
	}
}