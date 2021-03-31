import Link from '../src/Link'
import Button from '@material-ui/core/Button'

const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: '0 6rem',
      }}
    >
      {/* <h1
        style={{
          margin: 'auto 0',
          textAlign: 'center',
          backgroundColor: '#93cbab',
        }}
      >
        Header
      </h1> */}
      <Link href='/'>
        <Button>Home</Button>
      </Link>
      <Link href='/statement'>
        <Button>Beliefs</Button>
      </Link>
      <Link href='/sermons'>
        <Button>Sermons</Button>
      </Link>
      <Link href='/events'>
        <Button>Events</Button>
      </Link>
    </div>
  )
}

export default Header
