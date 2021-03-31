import Link from '../../src/Link'
import Button from '@material-ui/core/Button'

const AdminHome = () => {
  return (
    <div>
      <div className='card'>
        <h1>Sermons</h1>
        <Link href='/admin/addsermon'>
          <Button>Add Sermon</Button>
        </Link>
        <Link href='/admin/addsermon'>
          <Button color='primary'>Edit/Delete Sermon</Button>
        </Link>
      </div>
      <div className='card'>
        <h1>Events</h1>
        <Link href='/admin/addevent'>
          <Button>Add Event</Button>
        </Link>
        <Link href='/admin/editevent'>
          <Button color='primary'>Edit/Delete Event</Button>
        </Link>
      </div>
    </div>
  )
}

export default AdminHome
