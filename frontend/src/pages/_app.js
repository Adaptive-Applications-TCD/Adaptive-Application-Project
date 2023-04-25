import '@/styles/globals.css'
import { AuthUserProvider } from '../context/AuthUserContext';
import { ThemeProvider, createTheme } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f'
    }
  }
})

export function changeTheme() {
  theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFF'
      }
    }
  })
}

export default function App({ Component, pageProps }) {
  return <AuthUserProvider><ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider></AuthUserProvider>
}
