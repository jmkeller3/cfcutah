import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
    backgroundColor: '#eee',
    marginBottom: '20px',
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
  const [date, setDate] = useState(new Date())
  const [book, setBook] = useState('')
  const [description, setDescription] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('test', title, preacher, passage, date, book, description)
  }

  const handleSelect = (e) => {
    setBook(e.target.value)
    console.log(e)
  }

  const handleDateChange = (date) => {
    setDate(date)
    console.log(date)
  }

  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth='md'>
        <h1>Add A Sermon To The Website</h1>
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
      <Container maxWidth='md'>
        <h2>Sermon Preivew</h2>
        <Card className={classes.card}>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              {passage ? passage : 'Passage will display here'}
            </Typography>
            <Typography variant='h5' component='h2'>
              {title ? title : 'Title will display here'}
            </Typography>
            <Typography color='textSecondary'>
              {preacher ? preacher : 'Preacher will display here'}
            </Typography>
            <Typography variant='body2' component='p'>
              {description ? description : 'description will display here'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Listen or Download</Button>
          </CardActions>
        </Card>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

export default PostSermon
