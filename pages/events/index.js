import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Image from 'next/image'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core'

import imageURL from '../../public/Logo.svg'

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

const EventsPage = () => {
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
      <Card raised={true} className={classes.card}>
        <Image
          src='/Logo.svg'
          height={200}
          width={240}
          className={classes.image}
        />
        <CardContent>
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          <h3>Date</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            ipsum, in quas autem quibusdam quod distinctio a fuga cupiditate
            commodi.
          </p>
          <CardActions>
            <Button
              size='small'
              color='primary'
              variant='contained'
              target='_blank'
              href='#'
              style={{ margin: 'auto' }}
            >
              More details
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </main>
  )
}

export default EventsPage
