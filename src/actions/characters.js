import {dndRef} from '../firebaseAPI';
export const GRAB_CHARACTERS = 'GRAB_CHARACTERS';
export const GRAB_CHARACTER_OPTIONS = 'GRAB_CHARACTER_OPTIONS';
var firebase = require("firebase/app");
require('firebase/auth');


export const handleGrabCharacterOptions = () => async dispatch => {
	let temp = {};
	let userId = firebase.auth().currentUser.uid;
	await dndRef.child("users/"+userId+"/characters").on('value', async snapshot => {
		if(snapshot.val()){
			for(let i = 0; i < Object.keys(snapshot.val()).length; i++){
				await dndRef.child("characters/"+Object.keys(snapshot.val())[i]+"/name").on('value', function(snapshot1) {
					if(snapshot1.val()){
						temp[String(Object.keys(snapshot.val())[i])] = String(snapshot1.val());
					}
					if(i === Object.keys(snapshot.val()).length - 1){
						dispatch({
							type: GRAB_CHARACTER_OPTIONS,
							data: temp
						})
					}
				})
			}
		}
	})
}

export const handleGrabCharacter = (id) => async dispatch => {
	await dndRef.child("characters/"+id).on('value', snapshot => {
		dispatch({
			type: GRAB_CHARACTERS,
			data: snapshot.val(),
			id
		})
	})
}

export const handleUpdateNewCharacter = (name) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;
	var data = {creator: userId, items: {}, shared: [], name: name}
	var newCharacterKey = dndRef.child("characters").push().key;

	let characterPath = "characters/"+String(newCharacterKey);
	
	dndRef.update({["users/"+userId+ "/characters/"+String(newCharacterKey)]: true});
	dndRef.update({[characterPath]: data});
}

export const handleSaveCharacter = (id, data) => async dispatch => {	
	dndRef.child("characters/"+id+"/items").set(data);
}

export const handleDeleteCharacter = (id) => async dispatch => {
	let userId = firebase.auth().currentUser.uid;
	dndRef.child("characters/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() === userId){
			dndRef.child("characters/"+id).remove();
		}
		dndRef.child("users/"+userId+"/characters/"+id).remove();
	})
}

export const handleShareCharacter = (id, user) => async dispatch => {
	dndRef.child("characters/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() !== user){
			dndRef.child("users/"+user+"/characters").once('value').then(function(snapshot1){
				if(snapshot1.val()){
					if(!Object.keys(snapshot1.val()).includes(id)){
						dndRef.update({["users/"+user+ "/characters/"+id]: true})
						dndRef.update({["characters/"+id+"/shared/"+user]: true})
					}
				} else{
					dndRef.update({["users/"+user+ "/characters/"+id]: true})
					dndRef.update({["characters/"+id+"/shared/"+user]: true})
				}
			})
		}
	})
}