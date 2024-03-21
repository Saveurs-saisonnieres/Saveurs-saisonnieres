import { createTheme } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#afb42b',
      '&:hover': {
        color: 'white',
        backgroundColor: '#828A0E',
      },
    },
    secondary: {
      main: '#7b1fa2',
      '&:hover': {
        color: 'white',
        backgroundColor: '#5C107C',
      }
    },
  },
})
export default theme;
