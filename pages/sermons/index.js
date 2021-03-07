import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Image from 'next/image'
import CardActions from '@material-ui/core/CardActions'
// import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import { getSermons } from '../../config'
import imageURL from '../../public/Logo.svg'
import { format } from 'date-fns'

export async function getServerSideProps() {
  const sermons = await getSermons()

  // function compareDates(a, b) {
  //   return a.date - b.date
  // }

  // const sermons = unorderedSermons.sort(compareDates)

  return { props: { sermons } }
}

const SermonsPage = ({ sermons }) => {
  return (
    <div>
      <h1>Sermons</h1>
      {sermons &&
        sermons.map((sermon) => (
          <Card key={`${sermon.id}+${Math.random()}`}>
            <CardContent>
              <h2>{sermon.title}</h2>
              {/* <h3>{format(sermon.date, 'MM/dd/yyyy')}</h3> */}
              <small>{sermon.series}</small>
              <p>{sermon.description}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default SermonsPage
