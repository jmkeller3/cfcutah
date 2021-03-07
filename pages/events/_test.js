import { format } from 'date-fns'
import { firestore, docsToJSON, getEvents } from '../../config'
import { useEffect, useState } from 'react'

export async function getServerSideProps() {
  const events = await getEvents()

  return { props: { events } }
}

const Test = ({ events }) => {
  useEffect(() => {}, [])
  console.log(events)
  return (
    <div>
      {events &&
        events.map((event) => (
          <div className='eventCard' key={event.id}>
            <h2>{event.title}</h2>
            <small>{event.date}</small>
            <p>{event.details}</p>
            <a href={event.link}>More Info</a>
          </div>
        ))}
    </div>
  )
}

export default Test
