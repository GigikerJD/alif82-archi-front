
import { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(cookies.get("username") || {username: '', type: ''});
    const [isLoggedIn, setIsLoggedIn] = useState(cookies.get("isLoggedIn") || false);

    async function login(username = ""){
        await new Promise((resolve) => setTimeout(resolve, 1000))
        cookies.set("username", username, {
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
        setUser({ username, type });
        setIsLoggedIn(true);
    }

    async function logout(){
        await new Promise((resolve) => setTimeout(resolve, 1000))
        cookies.remove('username', { path: '/' });
        cookies.remove('isLoggedIn', { path: '/' });
        setUser({ username : '', type: '' });
        setIsLoggedIn(false);
    }

    return(
        <AppContext.Provider value={{ user, isLoggedIn, login, logout}}>
            {children}
        </AppContext.Provider>
    )
}

export const AppAuth = () => {
    return useContext(AppContext);
}