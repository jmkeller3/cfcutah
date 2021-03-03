import { useState, useEffect } from 'react'
import { firestore } from '../config'

// Gets items from a passed in collection

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id })
          console.log('this is a doc' + doc)
        })
        setDocs(documents)
      })

    console.log('firestore hook firing')

    return () => unsub()
  }, [collection])

  return { docs }
}

export default useFirestore
