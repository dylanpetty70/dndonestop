import {GRAB_MODULE_ENV, GRAB_MODULE_OPTIONS, GRAB_MODULE_ENV_OPTIONS, GRAB_MODULE_PLAYERS, SET_MODULE, GRAB_MAPS} from '../actions/modules';

export default function module(state = {envOptions: [], environment: {name: ''}, key: '', envKey: '', moduleOptions: [], players: {}, name: '', maps: {}}, action) {
	switch (action.type) {
		case GRAB_MODULE_ENV:
			return {...state, environment: action.data, envKey: action.id};
		case GRAB_MODULE_OPTIONS:
			return {...state, moduleOptions: action.data};
		case GRAB_MODULE_ENV_OPTIONS:
			return {...state, envOptions: action.data};
		case GRAB_MODULE_PLAYERS:
			return {...state, players: action.data};
		case SET_MODULE:
			return {...state, key: action.id};
		case GRAB_MAPS:
			return {...state, maps: action.data};
		default:
			return state;
	}
}