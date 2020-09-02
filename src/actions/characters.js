import * as api from '../API';
export const NEW_CHARACTER = 'NEW_CHARACTER';
export const SAVE_CHARACTER = 'SAVE_CHARACTER';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';

function updateNewCharacter(data) {
	return {
		type: NEW_CHARACTER,
		data
	};
}

function saveCharacter(data){
	return{
		type: SAVE_CHARACTER,
		data
	}
}

function deleteCharacter(data){
	return{
		type: DELETE_CHARACTER,
		data
	}
}

export function handleGrabCharacters(user){
	return async (dispatch) => {
		await api.grabCharacters(user)
			.then((data) => {
				dispatch(saveCharacter(data));
			})
	}
}

export function handleUpdateNewCharacter(name, user) {
	return async (dispatch) => {
		await api.addNewCharacter(name, user)
			.then((data) => {
				dispatch(updateNewCharacter(data));
			});
	}
}

export function handleSaveCharacter(name, data, user) {
	return async (dispatch) => {
		await api.saveCharacter(name, data, user)
			.then((data) => {
				dispatch(saveCharacter(data));
			});
	}
}

export function handleDeleteCharacter(name, user) {
	return async (dispatch) => {
		await api.deleteCharacter(name, user)
			.then((data) => {
				dispatch(deleteCharacter(data));
			});
	}
}

export function handleShareCharacter(name, creator, user) {
	return async (dispatch) => {
		await api.shareCharacter(name, creator, user)
	}
}