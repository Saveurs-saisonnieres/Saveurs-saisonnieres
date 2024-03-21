
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './components/AppRoutes'
import { ThemeProvider } from '@mui/material'
import theme from './assets/styles/theme'
import { useSelector } from 'react-redux'
import Footer from './components/Footer'
function App() {
  {/*const token = useSelector((state) => state.auth.token);*/}

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {/*{token && <Navbar />}*/}
          <Navbar />
          <AppRoutes />
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
