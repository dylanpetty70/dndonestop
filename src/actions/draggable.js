import {dndRef} from '../firebaseAPI';
export const GRAB_DRAGGABLE = 'GRAB_DRAGGABLE';
export const GRAB_OPTIONS = 'GRAB_OPTIONS';
export const CHANGE_GRID = 'CHANGE_GRID';
export const GRAB_ALL_OPTIONS = 'GRAB_ALL_OPTIONS';
var firebase = require("firebase/app");
require('firebase/auth');


export const handleGrabDraggable = (id) => async dispatch => {
	await dndRef.child('environments/'+ id).on('value', snapshot => {
		if(snapshot.val()){
			dispatch({
				type: GRAB_DRAGGABLE,
				data: snapshot.val(),
				id
			})
		} else {
			dispatch({
				type: GRAB_DRAGGABLE,
				data: {},
				id: ''
			})
		}
	})
}

export const handleGrabOptions = () => async dispatch => {
	let temp = {};
	let userId = firebase.auth().currentUser.uid;
	await dndRef.child("users/"+userId+"/environments").on('value', async snapshot => {
		if(snapshot.val()){
			for(let i = 0; i < Object.values(snapshot.val()).length; i++){
				await dndRef.child("environments/"+Object.values(snapshot.val())[i]+"/name").on('value', function(snapshot1) {
					if(snapshot1.val()){
						temp[String(Object.values(snapshot.val())[i])] = String(snapshot1.val());
					} else {
						dndRef.child("users/"+ userId + "/environments/"+ Object.keys(snapshot.val())[i]).remove();
					}
					if(i === Object.values(snapshot.val()).length - 1){
						dispatch({
							type: GRAB_OPTIONS,
							data: temp
						})
					}
				})
			}
		}
	})
}

export const restartItems = (items) => async dispatch => {
	dndRef.child("environments/items").set(items);
}

export const handleUpdateCurrent = (id, data) => async dispatch => {
	dndRef.child("environments/"+id+"/items").set(data);
}

export const handleNewEnvironment = (name) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;	
	var data = {creator: userId, items: [], shared: [], name: name, scale: '30'}
	var newEnvironmentKey = dndRef.child("environments").push().key;

	let environmentPath = "environments/"+String(newEnvironmentKey);

	dndRef.update({[environmentPath]: data});
	var newPostRef = dndRef.child("users/"+String(userId)+'/environments').push();
	newPostRef.set(newEnvironmentKey);

	handleGrabDraggable(newEnvironmentKey);
}

export const handleChangeScale = (id, scale) => async dispatch => {
	dndRef.child("environments/"+id+"/scale").set(scale);
}

export const handleDeleteEnvironment = (id) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;
	dndRef.child("environments/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() === userId){
			dndRef.child("environments/"+id).remove();
		}
		dndRef.child("users/"+userId+"/environments").once('value').then(function(snapshot1){
			for(var key in snapshot1.val()){
				if(snapshot1.val()[key] === id){
					dndRef.child("users/"+userId+"/environments/"+key).remove();
				}
			}
		})
	})
}

export const handleShareEnvironment = (id, user) => async dispatch => {
	dndRef.child("environments/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() !== user){
			dndRef.child("users/"+user+"/environments").once('value').then(function(snapshot1){
				if(snapshot1.val()){
					if(!Object.values(snapshot1.val()).includes(id)){
						var newPostRef = dndRef.child("users/"+user+ "/environments").push();
						newPostRef.set(id);
						var newPostRef2 = dndRef.child("environments/"+id+"/shared").push();
						newPostRef2.set(user);
					}
				} else{
					var newPostRef1 = dndRef.child("users/"+user+ "/environments").push();
					newPostRef1.set(id);
					var newPostRef3 = dndRef.child("environments/"+id+"/shared").push();
					newPostRef3.set(user);
				}
			})
		}
	})
}

export const handleChangeGrid = (input) => async dispatch => {
	dispatch({
		type: CHANGE_GRID,
		data: input
	})
}

export const handleGrabDraggableItems = () => async dispatch => {
	dndRef.child('environments/items').once('value').then(function(snapshot){
		dispatch({
			type: GRAB_ALL_OPTIONS,
			data: snapshot.val()
		})
	})
}
