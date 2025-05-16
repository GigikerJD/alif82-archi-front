
import { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(cookies.get("user") || "");
    const [isLoggedIn, setIsLoggedIn] = useState(cookies.get("isLoggedIn") || false);
    const backendUrl = 'http://localhost:8080/mysql_war_exploded/api/'

    async function login(email = ""){
        setUser(email);
        cookies.set("user", email, {
            path: "/",
            domain: "localhost",
            secure: false,
            httpOnly: false
        });
        cookies.set("isLoggedIn", true, {
            path: "/",
            domain: "localhost",
            secure: false,
            httpOnly: false
        });
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoggedIn(true);
    }

    async function logout(){
        cookies.remove('user', { path: '/', domain: 'localhost' });
        cookies.remove('isLoggedIn', { path: '/', domain: 'localhost' });
        await new Promise((resolve) => setTimeout(resolve, 2000))
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