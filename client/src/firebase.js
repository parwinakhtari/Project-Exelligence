import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCfntl4Kd9H58BjeCXsS123yFiW6AevI1U",
    authDomain: "mychatroom-f640b.firebaseapp.com",
    projectId: "mychatroom-f640b",
    storageBucket: "mychatroom-f640b.appspot.com",
    messagingSenderId: "608369627618",
    appId: "1:608369627618:web:ad09c16a89ffc1baf8e9bb",
    measurementId: "G-645532VBEF"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }