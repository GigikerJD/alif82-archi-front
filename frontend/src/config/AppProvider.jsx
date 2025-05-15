
import { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(cookies.get("user") || {email: ''});
    const [isLoggedIn, setIsLoggedIn] = useState(cookies.get("isLoggedIn") || false);
    const backendUrl = 'http://localhost:8080/mysql_war_exploded/api/'

    async function login(email = ""){
        await new Promise((resolve) => setTimeout(resolve, 2000))
        cookies.set("user", email, {
            path: "/",
            domain: "localhost",
            secure: true,
            httpOnly: false
        });
        cookies.set("isLoggedIn", true, {
            path: "/",
            domain: "localhost",
            secure: true,
            httpOnly: false
        });
        setUser({ email });
        setIsLoggedIn(true);
    }

    async function logout(){
        await new Promise((resolve) => setTimeout(resolve, 2000))
        cookies.remove('user', { path: '/' });
        cookies.remove('isLoggedIn', { path: '/' });
        setUser({ email : '' });
        setIsLoggedIn(false);
    }

    return(
        <AppContext.Provider value={{ user, isLoggedIn, login, logout, backendUrl }}>
            {children}
        </AppContext.Provider>
    )
}

export const AppAuth = () => {
    return useContext(AppContext);
}