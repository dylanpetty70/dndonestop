import { combineReducers } from 'redux';

import userStatus from './userStatus';
import dndInfo from './dndInfo';
import draggable from './draggable';
import envOptions from './envOptions';
import notepads from './notepads';
import characters from './characters';
import userNames from './userNames';
import editEnv from './editEnv';
import initiative from './initiative';
import draggableItems from './draggableItems';

export default combineReducers({
	userStatus,
	dndInfo,
	draggable,
	envOptions,
	notepads,
	characters,
	userNames,
	editEnv,
	initiative,
	draggableItems
})