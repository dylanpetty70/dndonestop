import {dndRef} from '../firebaseAPI';
export const GRAB_INITIATIVE = 'GRAB_INITIATIVE';
export const DELETE_INITIATIVE = 'DELETE_INITIATIVE';
export const GRAB_INITIATIVE_OPTIONS = 'GRAB_INITIATIVE_OPTIONS';
export const CHANGE_INITIATIVE_SHOW = 'CHANGE_INITIATIVE_SHOW';
var firebase = require("firebase/app");
require('firebase/auth');

export const handleGrabInitiativeOptions = () => async dispatch => {
	let temp = {};
	let userId = firebase.auth().currentUser.uid;
	await dndRef.child("users/"+userId+"/initiatives").on('value', async snapshot => {
		if(snapshot.val()){
			for(let i = 0; i < Object.values(snapshot.val()).length; i++){
				await dndRef.child("initiatives/"+Object.values(snapshot.val())[i]+"/name").on('value', function(snapshot1) {
					if(snapshot1.val()){
						temp[String(Object.values(snapshot.val())[i])] = String(snapshot1.val());
					} else {
						dndRef.child("users/"+ userId + "/initiatives/"+ Object.keys(snapshot.val())[i]).remove();
					}
					if(i === Object.values(snapshot.val()).length - 1){
						dispatch({
							type: GRAB_INITIATIVE_OPTIONS,
							data: temp
						})
					}
				})
			}
		} else {
			dispatch({
				type: GRAB_INITIATIVE_OPTIONS,
				data: temp
			})
		}
	})
}

export const handleGrabInitiative = (id) => async dispatch => {
	await dndRef.child('initiatives/'+ id).on('value', snapshot => {
		if(snapshot.val()){
			dispatch({
				type: GRAB_INITIATIVE,
				data: snapshot.val(),
				id
			})
		} else {
			dispatch({
				type: GRAB_INITIATIVE,
				data: {},
				id: ''
			})
		}
	})
}

export const handleUpdateInitiative = (id, data) => async dispatch => {
	dndRef.child("initiatives/"+id+"/items").set(data);
}

export const handleNewInitiative = (name) => async dispatch => {	
	let userId = firebase.auth().currentUser.uid;	
	var data = {creator: userId, items: [], shared: [], name: name}
	var newInitiativeKey = dndRef.child("initiatives").push().key;

	let initiativePath = "initiatives/"+String(newInitiativeKey);

	dndRef.update({[initiativePath]: data});
	var newPostRef = dndRef.child("users/"+String(userId)+'/initiatives').push();
	newPostRef.set(newInitiativeKey);
}

export const handleDeleteInitiative = (id) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;
	await dndRef.child("initiatives/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() === userId){
			dndRef.child("initiatives/"+id).remove();
		}
		dndRef.child("users/"+userId+"/initiatives").once('value').then(function(snapshot1){
			for(var key in snapshot1.val()){
				if(snapshot1.val()[key] === id){
					dndRef.child("users/"+userId+"/initiatives/"+key).remove();
				}
			}
		})
		dispatch({
			type: DELETE_INITIATIVE,
			id: id
		})
	})
}

export const handleShareInitiative = (id, user) => async dispatch => {
	dndRef.child("initiatives/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() !== user){
			dndRef.child("users/"+user+"/initiatives").once('value').then(function(snapshot1){
				if(snapshot1.val()){
					if(!Object.values(snapshot1.val()).includes(id)){
						var newPostRef = dndRef.child("users/"+user+ "/initiatives").push();
						newPostRef.set(id);
						var newPostRef2 = dndRef.child("initiatives/"+id+"/shared").push();
						newPostRef2.set(user);
					}
				} else{
					var newPostRef1 = dndRef.child("users/"+user+ "/initiatives").push();
					newPostRef1.set(id);
					var newPostRef3 = dndRef.child("initiatives/"+id+"/shared").push();
					newPostRef3.set(user);
				}
			})
		}
	})
}

export const changeInitiativeShow = () => {
	return{
		type: CHANGE_INITIATIVE_SHOW
	}
}
