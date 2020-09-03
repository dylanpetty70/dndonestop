import * as api from '../API';
export const NEW_INITIATIVE = 'NEW_INITIATIVE';
export const DELETE_INITIATIVE = 'DELETE_INITIATIVE';
export const UPDATE_INITIATIVE = 'UPDATE_INITIATIVE';
export const GRAB_INITIATIVE = 'GRAB_INITIATIVE';
export const CHANGE_INITIATIVE_SHOW = 'CHANGE_INITIATIVE_SHOW';

function newInitiative(data) {
	return {
		type: NEW_INITIATIVE,
		data
	};
}

function deleteInitiative(data) {
	return {
		type: DELETE_INITIATIVE,
		data
	};
}

function updateInitiative(data) {
	return {
		type: UPDATE_INITIATIVE,
		data
	};
}

function grabInitiative(data) {
	return {
		type: GRAB_INITIATIVE,
		data
	};
}

export function changeInitiativeShow() {
	return {
		type: CHANGE_INITIATIVE_SHOW
	};
}

export function handleNewInitiative(name, user) {
	return async (dispatch) => {
		await api.newInitiative(name, user)
			.then((data) => {
				dispatch(newInitiative(data));
			});
	}
}

export function handleDeleteInitiative(name, user) {
	return async (dispatch) => {
		await api.deleteInitiative(name, user)
			.then((data) => {
				dispatch(deleteInitiative(data));
			});
	}
}

export function handleShareInitiative(name, creator, user) {
	return async (dispatch) => {
		await api.shareInitiative(name, creator, user)
	}
}

export function handleUpdateInitiative(name, data, user) {
	return async (dispatch) => {
		await api.updateInitiative(name, data, user)
			.then((data) => {
				dispatch(updateInitiative(data));
			});
	}
}

export function handleGrabInitiative(user) {
	return async (dispatch) => {
		await api.grabInitiative(user)
			.then((data) => {
				dispatch(grabInitiative(data));
			});
	}
}