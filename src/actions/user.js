import * as api from '../API';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';
export const NEW_USER = 'NEW_USER';

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