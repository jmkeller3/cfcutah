import { useState, useEffect } from 'react'
import useStorage from '../../hooks/useStorage'

const UploadForm = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('')

  const [title, setTitle] = useState('')
  const [preacher, setPreacher] = useState('')
  const [passage, setPassage] = useState('')
  const [date, setDate] = useState('')
  const [book, setBook] = useState('')
  const [description, setDescription] = useState('')

  const types = ['audio/x-m4a']

  const changeHandler = (e) => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError('')
    } else {
      setFile(null)
      setError('Please select an audio file(m4a)')
    }
  }

  return (
    <form>
      <label>
        <input type='file' onChange={changeHandler} />
        <input type='text' onChange={({ target }) => setTitle(target.value)} />
        <input
          type='text'
          onChange={({ target }) => setPreacher(target.value)}
        />
        <input
          type='text'
          onChange={({ target }) => setPassage(target.value)}
        />
        <input type='text' onChange={({ target }) => setDate(target.value)} />
        <input
          type='text'
          onChange={({ target }) => setDescription(target.value)}
        />
        <input type='text' onChange={({ target }) => setBook(target.value)} />
        <span>+</span>
      </label>
      <div className='output'>
        {error && <div className='error'> {error} </div>}
        {file && <div> {file.name} </div>}
        {file && (
          <ProgressBar
            file={file}
            setFile={setFile}
            title={title}
            preacher={preacher}
            passage={passage}
            date={date}
            book={book}
            description={description}
          />
        )}
      </div>
    </form>
  )
}

const ProgressBar = ({
  file,
  setFile,
  title,
  preacher,
  passage,
  date,
  book,
  description,
}) => {
  const { url, progress } = useStorage(
    file,
    title,
    preacher,
    passage,
    date,
    book,
    description
  )

  useEffect(() => {
    if (url) {
      setFile(null)
      console.log(url)
    }
  }, [url, setFile])
  return (
    <div className='progress-bar' style={{ width: progress + '%' }}>
      This is the link <a href={url}>{url}</a>
    </div>
  )
}

export default UploadForm
