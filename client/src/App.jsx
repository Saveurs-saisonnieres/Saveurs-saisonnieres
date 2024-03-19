
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './components/AppRoutes'
import { ThemeProvider } from '@mui/material'
import theme from './assets/styles/theme'
function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <AppRoutes />

        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
