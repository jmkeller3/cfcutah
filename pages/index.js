import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import Link from '../src/Link'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'

const useStyles = makeStyles({
  opac: {
    zIndex: '-1',
    filter: 'blur(.3rem)',
  },
  dark: {
    backgroundColor: '#333',
    color: '#fff',
    '&:visited': {
      color: '#b6b6b6',
    },
  },
  sectionDark: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0',
    padding: '4rem 4rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  sectionLight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0',
    padding: '4rem 4rem',
    backgroundColor: '#fff',
  },
  btnLight: {
    color: '#16818f',
  },
})

const framerContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.6,
    },
  },
}

const framerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function Index() {
  const classes = useStyles()
  return (
    <>
      <motion.main
        variants={framerContainer}
        initial='hidden'
        animate='visible'
      >
        {/* <Image
          src='/Prayer.jpg'
          alt='Praying over Utah'
          layout='fill'
          objectFit='cover'
          className={classes.opac}
        /> */}
        <motion.section
          id='meeting_info'
          className={classes.sectionDark}
          variants={framerItem}
        >
          <h2>Come Worship with Us</h2>
          <div>
            <Typography align='center' gutterBottom={true}>
              Our current church gatherings are subject to change with the
              unfolding COVID-19 situation. For more information on when, where,
              and if we will hold a gathering, please contatus us via email (
              <a
                className={classes.dark}
                href='mailto:Timothy@christfellowshiputah.org'
              >
                Timothy@christfellowshiputah.org
              </a>
              ) or by phone (
              <a className={classes.dark} href='tel:801-831-4242'>
                801-831-4242
              </a>
              )
            </Typography>
          </div>
        </motion.section>
        <motion.section
          id='statement_info'
          className={classes.sectionLight}
          variants={framerItem}
        >
          <h2>Mission Statement</h2>
          <Typography align='center' gutterBottom={true}>
            Our purpose is to glorify God by multiplying, gathering, and
            equipping disciples of Jesus Christ through the power of the Holy
            Spirit.
          </Typography>
          <Link href='/statement'>
            <Button
              variant='outlined'
              color='secondary'
              className={classes.btnLight}
            >
              More Information
            </Button>
          </Link>
        </motion.section>
        <motion.section
          id='sermon_info'
          className={classes.sectionDark}
          variants={framerItem}
        >
          <h2>Latest Sermons</h2>
          <Typography align='center' gutterBottom={true}>
            We strive to preach expositionally through the whole council of
            God's Word. You can hear our last sermon by clicking the link below.
          </Typography>
          <Link href='/sermons'>
            <Button variant='outlined' color='primary'>
              Listen to Sermons
            </Button>
          </Link>
        </motion.section>
        <motion.section
          id='event_info'
          className={classes.sectionLight}
          variants={framerItem}
        >
          <h2>Coming Events</h2>
          <Typography align='center' gutterBottom={true}>
            We host free camps, cookouts, and other communuity activities
            throughout the year. Click below to see what is ahead.
          </Typography>
          <Link href='/events'>
            <Button
              variant='outlined'
              color='secondary'
              className={classes.btnLight}
            >
              Coming Events
            </Button>
          </Link>
        </motion.section>
        <motion.section
          id='giving_info'
          className={classes.sectionDark}
          variants={framerItem}
        >
          <h2>Giving</h2>
          <Typography align='center' gutterBottom={true}>
            If you want to support our ministry, you can give when we gather
            together every Sunday or online through the link below.
          </Typography>
          <Link href='https://tithe.ly/give_new/www/#/tithely/give-one-time/567613'>
            <Button
              variant='outlined'
              color='primary'
              target='_blank'
              rel='noreferrer'
            >
              Give
            </Button>
          </Link>
        </motion.section>
      </motion.main>
    </>
  )
}
