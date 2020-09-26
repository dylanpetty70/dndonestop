import {dndRef} from '../firebaseAPI';
export const GRAB_DRAGGABLE = 'GRAB_DRAGGABLE';
export const GRAB_OPTIONS = 'GRAB_OPTIONS';
export const CHANGE_GRID = 'CHANGE_GRID';
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND';
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
			for(let i = 0; i < Object.keys(snapshot.val()).length; i++){
				await dndRef.child("environments/"+Object.keys(snapshot.val())[i]+"/name").on('value', function(snapshot1) {
					if(snapshot1.val()){
						temp[String(Object.keys(snapshot.val())[i])] = String(snapshot1.val());
					}
					if(i === Object.keys(snapshot.val()).length - 1){
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

export const handleAddNewItem = (id, item) => async dispatch => {
	dndRef.child("environments/"+id+"/items").push(item);
}

export const handleDeleteItem = (id, item) => async dispatch => {
	dndRef.child("environments/"+id+"/items/"+item).remove();
}

export const handleUpdateItem = (id, item, data) => async dispatch => {
	dndRef.child("environments/"+id+"/items").update({[item]: data});
}

export const handleNewMessage = (id, text) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;	
	let date = Date.now()

	var data = {creator: userId, time: date, text: text}
	var newTextKey = dndRef.child("environments/" + id + "/chat").push().key;

	let textPath = "environments/" + id + "/chat/" + String(newTextKey);

	dndRef.update({[textPath]: data});
}

export const handleDeleteMessage = (env, id) => async dispatch => {
	dndRef.child("environments/"+env+"/chat/"+id).remove();
}

export const handleNewEnvironment = (name) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;	
	var data = {creator: userId, items: [], shared: [], name: name, scale: '30'}
	var newEnvironmentKey = dndRef.child("environments").push().key;

	let environmentPath = "environments/"+String(newEnvironmentKey);
	
	dndRef.update({["users/"+userId+ "/environments/"+String(newEnvironmentKey)]: true});
	dndRef.update({[environmentPath]: data});
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
		dndRef.child("users/"+userId+"/environments/"+id).remove();
	})
}

export const handleShareEnvironment = (id, user) => async dispatch => {
	dndRef.child("environments/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() !== user){
			dndRef.child("users/"+user+"/environments").once('value').then(function(snapshot1){
				if(snapshot1.val()){
					if(!Object.values(snapshot1.val()).includes(id)){
						dndRef.update({["users/"+user+ "/environments/"+id]: true})
						dndRef.update({["environments/"+id+"/shared/"+user]: true})
					}
				} else{
					dndRef.update({["users/"+user+ "/environments/"+id]: true})
					dndRef.update({["environments/"+id+"/shared/"+user]: true})
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

export const handleChangeBackground = (input) => async dispatch => {
	dispatch({
		type: CHANGE_BACKGROUND,
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
