import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyDpAknuvkiNqhQQXDrxF0o27B9FUySE5AM',
  authDomain: 'christ-fellowship-41797.firebaseapp.com',
  databaseURL: 'https://christ-fellowship-41797.firebaseio.com',
  projectId: 'christ-fellowship-41797',
  storageBucket: 'christ-fellowship-41797.appspot.com',
  messagingSenderId: '431166887910',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// Auth exports
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

// Storeage exports
export const firestore = firebase.firestore()
export const storage = firebase.storage()
