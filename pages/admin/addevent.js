import Image from 'next/image'
import { useRouter } from 'next/router'
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

import { format } from 'date-fns'

import imageURL from '../../public/Logo.svg'
import { firestore } from '../../config'

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
  media: {
    height: 240,
  },
  image: {
    opacity: 0.5,
    margin: '0',
  },
}))

const AddEvent = () => {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState(Date.now())
  const [body, setBody] = useState('')
  const [link, setLink] = useState('#')
  const [isPending, setIsPending] = useState(false)

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const event = { title, date, body, link }

    setIsPending(true)

    try {
      firestore
        .collection('events')
        .add({
          title,
          date,
          details: body,
          link,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
        })
        .then(() => {
          console.log('new event added')
          setIsPending(false)
          setTimeout(() => {
            router.push('/events')
          }, 1500)
        })
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleDateChange = (date) => {
    setDate(date)
  }

  const formatDate = format(date, 'MM/dd/yyyy')

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          // backgroundColor: '#93cbab',
        }}
      >
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
            variant='standard'
            onChange={({ target }) => setTitle(target.value)}
          />
          <KeyboardDatePicker
            margin='normal'
            variant='inline'
            id='date-picker-dialog'
            label='Pick Date of Event'
            format='MM/dd/yyyy'
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            required
            id='standard-required'
            label='Details'
            multiline
            variant='standard'
            onChange={({ target }) => setBody(target.value)}
          />
          <TextField
            required
            id='standard-required'
            label='Link'
            variant='standard'
            onChange={({ target }) => setLink(target.value)}
          />
          {!isPending && (
            <Button color='secondary' variant='outlined' type='submit'>
              Add Event
            </Button>
          )}
          {isPending && <Button disabled>Adding Event...</Button>}
        </form>
        <h1 style={{ margin: '0' }}>Preivew</h1>
        <Card raised={true} className={classes.card}>
          <Image
            src='/Logo.svg'
            height={200}
            width={240}
            className={classes.image}
          />
          <CardContent>
            {title !== '' ? <h2>{title}</h2> : <h2>Title goes here</h2>}
            {date && <h3>{formatDate}</h3>}
            {body !== '' ? <p>{body}</p> : <p>Details go here</p>}
            <CardActions>
              <Button
                size='small'
                color='primary'
                variant='contained'
                target='_blank'
                href={link}
                style={{ margin: 'auto' }}
              >
                More details
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </main>
    </MuiPickersUtilsProvider>
  )
}

export default AddEvent
