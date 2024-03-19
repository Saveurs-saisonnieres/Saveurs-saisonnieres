
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './components/AppRoutes'
import { ThemeProvider } from '@mui/material'
import theme from './assets/styles/theme'
import { useSelector } from 'react-redux'
function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {token && <Navbar />}

          <AppRoutes />

        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
