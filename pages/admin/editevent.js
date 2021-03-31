import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Image from 'next/image'
import CardActions from '@material-ui/core/CardActions'
// import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import { getEvents } from '../../config'
import imageURL from '../../public/Logo.svg'
import { format } from 'date-fns'

export async function getServerSideProps() {
  const unorderedEvents = await getEvents()

  function compareDates(a, b) {
    return a.date - b.date
  }

  const events = unorderedEvents.sort(compareDates)

  return { props: { events } }
}

const useStyles = makeStyles({
  card: {
    minWidth: 300,
    maxWidth: 500,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(218, 211, 199, 0.3)',
  },
  media: {
    height: 240,
  },
  image: {
    opacity: 0.5,
    margin: '0',
  },
})

const EventsPage = ({ events }) => {
  const classes = useStyles()

  return (
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
      <h1 style={{ margin: '0' }}>Upcoming Events</h1>
      {events &&
        events.map((event) => (
          <Card
            raised={true}
            className={classes.card}
            key={`${event.id}+${Math.random()}`}
          >
            <Image
              src='/Logo.svg'
              height={200}
              width={240}
              className={classes.image}
            />
            <CardContent>
              <h2>{event.title}</h2>
              <h3>{format(event.date, 'MM/dd/yyyy')}</h3>
              <p>{event.details}</p>
              <CardActions>
                <Button
                  size='small'
                  color='primary'
                  variant='contained'
                  target='_blank'
                  href={event.link}
                  style={{ margin: 'auto' }}
                >
                  More details
                </Button>
                <Button
                  size='small'
                  color='secondary'
                  variant='contained'
                  target='_blank'
                  href={event.link}
                  style={{ margin: 'auto' }}
                >
                  Edit
                </Button>
                <Button
                  size='small'
                  variant='contained'
                  target='_blank'
                  href={event.link}
                  style={{ margin: 'auto' }}
                  //   onClick={}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
    </main>
  )
}

export default EventsPage
