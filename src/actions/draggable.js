import * as api from '../API';
export const ADD_ITEM = 'ADD_ITEM';
export const GRAB_DRAGGABLE = 'GRAB_DRAGGABLE';
export const UPDATE_CURRENT = 'UPDATE_CURRENT';
export const NEW_ENVIRONMENT = 'NEW_ENVIRONMENT';
export const GRAB_OPTIONS = 'GRAB_OPTIONS';
export const CHANGE_CURRENT_ENV = 'CHANGE_CURRENT_ENV';
export const CHANGE_SCALE = 'CHANGE_SCALE';


export function changeCurrentEnv(data){
	return {
		type: CHANGE_CURRENT_ENV,
		data
	}
}

function addNewItem(data) {
	return {
		type: ADD_ITEM,
		data
	};
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

export function handleChangeScale(scale, environment){
	return async (dispatch) => {
		await api.changeScale(scale, environment)
			.then((data) => {
				dispatch(changeScale(scale));
			})
	}
}

export function handleAddNewItem(item, component){
	return async (dispatch) => {
		await api.addItem(item, component)
			.then((data) => {
				dispatch(addNewItem(data));
			})
	}
}

export function handleUpdateCurrent(environment, current){
	return async (dispatch) => {
		await api.updateCurrent(environment, current)
			.then((data) => {
				dispatch(updateCurrent(data));
			})
	}
}

export function handleGrabDraggable(environment){
	return async (dispatch) => {
		await api.grabDraggable(environment)
			.then((data) => {
				dispatch(grabDraggable(data, environment));
			})
	}
}

export function handleNewEnvironment(name){
	return async (dispatch) => {
		await api.newEnvironment(name)
			.then((data) => {
				dispatch(newEnvironment(data[0], name, data[1]));
			})
	}
}

export function handleGrabOptions(){
	return async (dispatch) => {
		await api.grabOptions()
			.then((data) => {
				dispatch(grabOptions(data));
			})
	}
}