import {GRAB_MODULE_ENV, GRAB_MODULE_OPTIONS, GRAB_MODULE_ENV_OPTIONS, GRAB_MODULE_PLAYERS, SET_MODULE, GRAB_MAPS, GRAB_MAP_CURRENT, GRAB_MODULE_CHAT} from '../actions/modules';

export default function module(state = {envOptions: [], environment: {name: ''}, key: '', envKey: '', moduleOptions: [], players: {}, name: '', maps: {}, currentMap: '', chat: {}}, action) {
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
		case GRAB_MAP_CURRENT:
			return {...state, currentMap: action.data};
		case GRAB_MODULE_CHAT:
			return {...state, chat: action.data};
		default:
			return state;
	}
}