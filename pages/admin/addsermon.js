import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { format } from 'date-fns'
import Link from '../../src/Link'

import { storage, timestamp, firestore } from '../../config'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%',
  },
  card: {
    minWidth: 275,
    maxWidth: 500,
    backgroundColor: '#333',
    marginBottom: '20px',
  },
  white: {
    color: '#fff',
  },
}))

const books = [
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  'Deuteronomy',
  'Joshua',
  'Judges',
  'Ruth',
  '1 Samuel',
  '2 Samuel',
  '1 Kings',
  '2 Kings',
  '1 Chronicles',
  '2 Chronicles',
  'Ezra',
  'Nehemiah',
  'Esther',
  'Job',
  'Psalm',
  'Proverbs',
  'Ecclesiastes',
  'Song of Solomon',
  'Isaiah',
  'Jeremiah',
  'Lamentations',
  'Ezekiel',
  'Daniel',
  'Hosea',
  'Joel',
  'Amos',
  'Obadiah',
  'Jonah',
  'Micah',
  'Nahum',
  'Habakkuk',
  'Zephaniah',
  'Haggai',
  'Zechariah',
  'Malachi',
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Romans',
  '1 Corinthians',
  '2 Corinthians',
  'Galatians',
  'Ephesians',
  'Philippians',
  'Colossians',
  '1 Thessalonians',
  '2 Thessalonians',
  '1 Timothy',
  '2 Timothy',
  'Titus',
  'Philemon',
  'Hebrews',
  'James',
  '1 Peter',
  '2 Peter',
  '1 John',
  '2 John',
  '3 John',
  'Jude',
  'Revelation',
]

const PostSermon = () => {
  const [title, setTitle] = useState('')
  const [preacher, setPreacher] = useState('')
  const [passage, setPassage] = useState('')
  const [date, setDate] = useState(Date.now())
  const [book, setBook] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState(null)
  const [file, setFile] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [fileError, setFileError] = useState(null)
  const [progress, setProgress] = useState(0)

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    // const sermon = { title, preacher, passage, date, book, description }

    setIsPending(true)

    try {
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
          collectionRef
            .add({
              url,
              title,
              preacher,
              passage,
              date,
              book,
              description,
            })
            .then((docRef) => {
              console.log('Document written with ID: ', docRef.id)
            })
            .then(() => {
              console.log('new sermon added')
              setIsPending(false)
              setTimeout(() => {
                router.push('/sermons')
              }, 1500)
            })
        }
      )

      // firestore
      //   .collection('sermons')
      //   .add({
      //     title,
      //     preacher,
      //     passage,
      //     date,
      //     book,
      //     description,
      //     url,
      //   })
      //   .then((docRef) => {
      //     console.log('Document written with ID: ', docRef.id)
      //   })
      //   .then(() => {
      //     console.log('new sermon added')
      //     setIsPending(false)
      //     setTimeout(() => {
      //       router.push('/sermons')
      //     }, 1500)
      //   })
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleSelect = (e) => {
    setBook(e.target.value)
    // console.log(e)
  }

  const handleDateChange = (date) => {
    setDate(date)
  }

  const types = ['audio/x-m4a']

  const handleFile = (e) => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setFileError('')
    } else {
      setFile(null)
      setFileError('Please select an accepted audio file (m4a)')
    }
  }

  const formatDate = format(date, 'MM/dd/yyyy')

  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth='md'>
        <h1>Add A Sermon To The Website</h1>
        <Link href='/admin'>
          <Button variant='contained'>Go Back</Button>
        </Link>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete='off'
        >
          <TextField
            required
            id='standard-required'
            label='Title'
            variant='outlined'
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            required
            id='standard-required'
            label='Preacher'
            variant='outlined'
            onChange={({ target }) => setPreacher(target.value)}
          />
          <TextField
            required
            id='standard-required'
            label='Passage'
            variant='outlined'
            onChange={({ target }) => setPassage(target.value)}
          />
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label='Pick Date of Sermon'
            format='MM/dd/yyyy'
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            id='standard-select-book'
            select
            label='Select'
            value={book}
            onChange={handleSelect}
            helperText='Please select a book from the Bible'
            variant='outlined'
          >
            {books.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='outlined-textarea'
            label='Description'
            placeholder='Decribe the sermon in a few sentences'
            multiline
            variant='outlined'
            onChange={({ target }) => setDescription(target.value)}
          />
          <input type='file' onChange={handleFile} />
          <div>
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              color='secondary'
              className={classes.submit}
              size='large'
            >
              Post
            </Button>
          </div>
        </form>
      </Container>
      <Container
        maxWidth='md'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          // backgroundColor: '#93cbab',
        }}
      >
        <h2>Sermon Preivew</h2>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.white} gutterBottom>
              {passage ? passage : 'Passage will display here'}
            </Typography>
            <Typography
              variant='h5'
              component='h2'
              color='primary'
              gutterBottom
            >
              {title ? title : 'Title will display here'}
            </Typography>
            <Typography className={classes.white} gutterBottom>
              {preacher ? preacher : 'Preacher will display here'}
            </Typography>
            <Typography
              variant='body2'
              color='primary'
              align='center'
              gutterBottom
            >
              {date ? formatDate : 'Date will display here'}
            </Typography>
            <Typography variant='body1' component='p' className={classes.white}>
              {description ? description : 'Description will display here'}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              // backgroundColor: '#93cbab',
            }}
          >
            <Button size='small' className={classes.white}>
              Listen or Download
            </Button>
          </CardActions>
        </Card>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

export default PostSermon
