import { useState, useEffect } from 'react'
import useStorage from '../../hooks/useStorage'

const UploadForm = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('')

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
        <span>+</span>
      </label>
      <div className='output'>
        {error && <div className='error'> {error} </div>}
        {file && <div> {file.name} </div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  )
}

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file)

  useEffect(() => {
    if (url) {
      setFile(null)
    }
  }, [url, setFile])
  return (
    <div className='progress-bar' style={{ width: progress + '%' }}>
      This is the link <a href={url}>{url}</a>
    </div>
  )
}

export default UploadForm
