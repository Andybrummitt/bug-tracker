import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({});

    useEffect(() => {
        console.log([auth])
    }, [auth])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    )
};

export default AuthProvider;