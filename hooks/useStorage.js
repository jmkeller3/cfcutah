import { useState, useEffect } from 'react'
import { storage, timestamp, firestore } from '../config'

const useStorage = (
  file,
  title,
  preacher,
  passage,
  date,
  book,
  description
) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    // References
    const storageRef = storage.ref(file.name)

    const collectionRef = firestore.collection('sermons')

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
        setProgress(percentage)
      },
      (err) => {
        setError(err)
      },
      async () => {
        const url = await storageRef.getDownloadURL()
        const createdAt = timestamp()
        setUrl(url)
        collectionRef.add({
          url,
          createdAt,
          title,
          preacher,
          passage,
          date,
          book,
          description,
        })
      }
    )
  }, [file])

  return { progress, url, error }
}

export default useStorage
