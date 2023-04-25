import { createContext, useContext, Context } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';


export const themeContext = createContext({
    theme: {
        palette: {
            primary: {
                main: '#d32f2f'
            }
        }
    }
})


// export function ThemeConextProvider({ children }) {
//     return <ThemeProvider theme={}></ThemeProvider>
// }

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}