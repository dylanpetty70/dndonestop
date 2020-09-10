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
			for(let i = 0; i < Object.keys(snapshot.val()).length; i++){
				await dndRef.child("initiatives/"+Object.keys(snapshot.val())[i]+"/name").on('value', function(snapshot1) {
					if(snapshot1.val()){
						temp[String(Object.keys(snapshot.val())[i])] = String(snapshot1.val());
					}
					if(i === Object.keys(snapshot.val()).length - 1){
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
	
	dndRef.update({["users/"+userId+ "/initiatives/"+String(newInitiativeKey)]: true});
	dndRef.update({[initiativePath]: data});
}

export const handleDeleteInitiative = (id) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;
	await dndRef.child("initiatives/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() === userId){
			dndRef.child("initiatives/"+id).remove();
		}
		dndRef.child("users/"+userId+"/initiatives/"+id).remove();
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
						dndRef.update({["users/"+user+ "/initiatives/"+id]: true})
						dndRef.update({["initiatives/"+id+"/shared/"+user]: true})
					}
				} else{
					dndRef.update({["users/"+user+ "/initiatives/"+id]: true})
					dndRef.update({["initiatives/"+id+"/shared/"+user]: true})
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
