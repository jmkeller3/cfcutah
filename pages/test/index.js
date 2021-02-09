import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '../../src/Link'

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js example
        </Typography>
        <Link href='/about' color='secondary' style={{ margin: '0 10px' }}>
          Go to the about page
        </Link>
        <Link href='/login' color='secondary' style={{ margin: '0 10px' }}>
          Go to the login page
        </Link>
        <Link href='/sermons' color='secondary' style={{ margin: '0 10px' }}>
          Go to the sermons page
        </Link>
      </Box>
    </Container>
  )
}
