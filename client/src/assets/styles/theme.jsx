import { createTheme } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: lime[600],
      '&:hover': {
        color: 'white',
        backgroundColor: lime[700],
      },
    },
    secondary: {
      main: purple[700],
      '&:hover': {
        color: 'white',
        backgroundColor: purple[800],
      }
    },
  },
})
export default theme