import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../utils/useFirebaseAuth';

export const authUserContext = createContext({
    authUser: null,
    loading: true
});

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}