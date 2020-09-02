import * as api from '../API';
export const GRAB_DRAGGABLE = 'GRAB_DRAGGABLE';
export const UPDATE_CURRENT = 'UPDATE_CURRENT';
export const NEW_ENVIRONMENT = 'NEW_ENVIRONMENT';
export const GRAB_OPTIONS = 'GRAB_OPTIONS';
export const CHANGE_CURRENT_ENV = 'CHANGE_CURRENT_ENV';
export const CHANGE_SCALE = 'CHANGE_SCALE';
export const DELETE_ENVIRONMENT = 'DELETE_ENVIRONMENT';


export function changeCurrentEnv(data){
	return {
		type: CHANGE_CURRENT_ENV,
		data
	}
}


function grabDraggable(data, environment){
	return{
		type: GRAB_DRAGGABLE,
		data,
		environment
	}
}

function updateCurrent(data){
	return{
		type: UPDATE_CURRENT,
		data
	}
}

function newEnvironment(data, name, options){
	return{
		type: NEW_ENVIRONMENT,
		data,
		name,
		options
	}
}

function deleteEnvironment(data){
	return{
		type: DELETE_ENVIRONMENT,
		data,
	}
}

function grabOptions(data){
	return{
		type: GRAB_OPTIONS,
		data
	}
}

function changeScale(data){
	return{
		type: CHANGE_SCALE,
		data
	}
}

export function handleDeleteEnvironment(name, user){
	return async (dispatch) => {
		await api.deleteEnvironment(name, user)
			.then((data) => {
				dispatch(deleteEnvironment(data));
			})
	}
}

export function handleChangeScale(scale, environment, user){
	return async (dispatch) => {
		await api.changeScale(scale, environment, user)
			.then((data) => {
				dispatch(changeScale(scale));
			})
	}
}


export function handleUpdateCurrent(environment, current, user){
	return async (dispatch) => {
		await api.updateCurrent(environment, current, user)
			.then((data) => {
				dispatch(updateCurrent(data));
			})
	}
}

export function handleGrabDraggable(environment, user){
	return async (dispatch) => {
		await api.grabDraggable(environment, user)
			.then((data) => {
				dispatch(grabDraggable(data, environment));
			})
	}
}

export function handleNewEnvironment(name, user){
	return async (dispatch) => {
		await api.newEnvironment(name, user)
			.then((data) => {
				dispatch(newEnvironment(data[0], name, data[1]));
			})
	}
}

export function handleGrabOptions(user){
	return async (dispatch) => {
		await api.grabOptions(user)
			.then((data) => {
				dispatch(grabOptions(data));
			})
	}
}

export function handleShareEnvironment(environment, creator, user){
	return async (dispatch) => {
		await api.shareEnvironment(environment, creator, user)
	}
}