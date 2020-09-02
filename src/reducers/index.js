import { combineReducers } from 'redux';

import user from './user';
import userStatus from './userStatus';
import dndInfo from './dndInfo';
import draggable from './draggable';
import envOptions from './envOptions';
import notepads from './notepads';
import notesOptions from './notesOptions';
import characters from './characters';
import userNames from './userNames';
import editEnv from './editEnv';

export default combineReducers({
	user,
	userStatus,
	dndInfo,
	draggable,
	envOptions,
	notepads,
	notesOptions,
	characters,
	userNames,
	editEnv
})