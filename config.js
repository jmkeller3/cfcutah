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
  appId: '1:431166887910:web:a06fcc047d500801b66827',
}

// nextjs initialization for firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// Auth exports
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

// Storeage exports
export const firestore = firebase.firestore()
export const storage = firebase.storage()

// *helper functions*

// TimeStamp
export const timestamp = firebase.firestore.FieldValue.serverTimestamp

// Events
export async function getEvents() {
  const eventsRef = firestore.collection('events')
  const snapshot = await eventsRef.get()
  let eventsDocs = []
  snapshot.forEach((doc) => {
    eventsDocs.push(doc.data())
  })

  return eventsDocs
}

// Sermons
export async function getSermons() {
  const sermonsRef = firestore
    .collection('sermons')
    .orderBy('createdAt', 'desc')
    .limit(5)
  const snapshot = await sermonsRef().get()
  let sermonsDocs = []
  snapshot.forEach((doc) => {
    sermonsDocs.push(doc.data())
  })

  return sermonsDocs
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function docsToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  }
}
