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
			for(let i = 0; i < Object.values(snapshot.val()).length; i++){
				await dndRef.child("characters/"+Object.values(snapshot.val())[i]+"/name").on('value', function(snapshot1) {
					if(snapshot1.val()){
						temp[String(Object.values(snapshot.val())[i])] = String(snapshot1.val());
					} else {
						dndRef.child("users/"+ userId + "/characters/"+ Object.keys(snapshot.val())[i]).remove();
					}
					if(i === Object.values(snapshot.val()).length - 1){
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

	dndRef.update({[characterPath]: data});
	var newPostRef = dndRef.child("users/"+userId+ "/characters").push();
	newPostRef.set(newCharacterKey);
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
		dndRef.child("users/"+userId+"/characters").once('value').then(function(snapshot1){
			for(var key in snapshot1.val()){
				if(snapshot1.val()[key] === id){
					console.log('here')
					dndRef.child("users/"+userId+"/characters/"+key).remove();
				}
			}
		})
	})
}

export const handleShareCharacter = (id, user) => async dispatch => {
	dndRef.child("characters/"+id+"/creator").once('value').then(function(snapshot){
		if(snapshot.val() !== user){
			console.log('here')
			dndRef.child("users/"+user+"/characters").once('value').then(function(snapshot1){
				if(snapshot1.val()){
					if(!Object.values(snapshot1.val()).includes(id)){
						var newPostRef = dndRef.child("users/"+user+ "/characters").push();
						newPostRef.set(id);
						var newPostRef2 = dndRef.child("characters/"+id+"/shared").push();
						newPostRef2.set(user);
					}
				} else{
					var newPostRef1 = dndRef.child("users/"+user+ "/characters").push();
					newPostRef1.set(id);
					var newPostRef3 = dndRef.child("characters/"+id+"/shared").push();
					newPostRef3.set(user);
				}
			})
		}
	})
}