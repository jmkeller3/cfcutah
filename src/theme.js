import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#84c887',
      main: '#66bb6a',
      // dark: '#47824a',
    },
    secondary: {
      // light: '#51d1e1',
      main: '#26c6da',
      dark: '#16818f',
      // contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

export default theme
