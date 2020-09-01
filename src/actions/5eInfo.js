import * as api from '../API';
export const UPDATE_5E = 'UPDATE_5E';
export const GRAB_5E = 'GRAB_5E';

function update5e(data) {
	return {
		type: UPDATE_5E,
		data
	};
}

function grab5e(data) {
	return {
		type: GRAB_5E,
		data
	};
}

export function handleUpdate5e() {
	return async (dispatch) => {
		await api.update5e()
			.then((data) => {
				dispatch(update5e(data));
			});
	}
}

export function handleGrab5e() {
	return async (dispatch) => {
		await api.grab5e()
			.then((data) => {
				dispatch(grab5e(data));
			});
	}
}