import {dndRef} from '../firebaseAPI';
export const GRAB_5E = 'GRAB_5E';

export const handleGrab5e = () => async dispatch => {
	dndRef.child("5e").once('value').then(function(snapshot){
		dispatch({
			type: GRAB_5E,
			data: snapshot.val()
		})
	})
}