import * as api from '../API';
export const NEW_CHARACTER = 'NEW_CHARACTER';
export const SAVE_CHARACTER = 'SAVE_CHARACTER';

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

export function handleGrabCharacters(){
	return async (dispatch) => {
		await api.grabCharacters()
			.then((data) => {
				dispatch(saveCharacter(data));
			})
	}
}

export function handleUpdateNewCharacter(name) {
	return async (dispatch) => {
		await api.addNewCharacter(name)
			.then((data) => {
				dispatch(updateNewCharacter(data));
			});
	}
}

export function handleSaveCharacter(name, data) {
	return async (dispatch) => {
		await api.saveCharacter(name, data)
			.then((data) => {
				dispatch(saveCharacter(data));
			});
	}
}