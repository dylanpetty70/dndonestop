import {handleUserStatus} from './actions/user';
var firebase = require("firebase/app");
require('firebase/database');
require('firebase/auth');


var firebaseConfig = {
apiKey: "AIzaSyAw9UoWxfu6bdVKVbNdScAHZ-1t4AK7D-c",
authDomain: "dylan-s-database.firebaseapp.com",
databaseURL: "https://dylan-s-database.firebaseio.com",
storageBucket: "dylan-s-database.appspot.com",
messagingSenderId: "395061704458",
appId: "1:395061704458:web:fe5148226ae8619e79acf3",
measurementId: "G-QGJJCQVQMH"
};

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const dndRef = databaseRef.child("dnd");

let temp = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    temp = firebase.auth().currentUser.uid;
    handleUserStatus(true);
  } else {
    temp = null;
  }
});

export const userId = temp;
