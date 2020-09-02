import * as api from '../API';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';
export const NEW_USER = 'NEW_USER';
export const GRAB_NAMES = 'GRAB_NAMES';

function checkPassword(check, userInfo) {
	return {
		type: CHECK_PASSWORD,
		check,
		userInfo
	};
}

function newUser(status, firstName, lastName, username) {
	return {
		type: NEW_USER,
		status,
		firstName,
		lastName,
		username
	};
}

function grabNames(data) {
	return {
		type: GRAB_NAMES,
		data
	};
}

export function handleCheckPassword(username, password) {
	return async (dispatch) => {
		await api.checkPassword(username, password)
			.then((result) => {
				dispatch(checkPassword(result.check, result.userInfo));
			});
	}
}

export function handleNewUser(username, firstName, lastName, password) {
	return async (dispatch) => {
		await api.newUser(username, firstName, lastName, password)
			.then((result) => {
				dispatch(newUser(result, firstName, lastName, username));
			});
	}
}

export function handleGrabNames() {
	return async (dispatch) => {
		await api.grabNames()
			.then((data) => {
				dispatch(grabNames(data));
			});
	}
}