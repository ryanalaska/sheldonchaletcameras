import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import theme from './theme/theme'
import { RouterProvider } from 'react-router-dom'
import router from './Routes';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />      
       </AuthProvider>
    </ThemeProvider>
  )
}

export default App
