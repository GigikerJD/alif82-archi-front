import { AppAuth } from "../config/AppProvider";
import { DashboardHeader } from "./DashboardHeader";
import { DefaultHeader } from "./DefaultHeader";


function Header(){
    const { isLoggedIn } = AppAuth();

    return(
        <>{ isLoggedIn ? <DashboardHeader/> : <DefaultHeader/> }</>
    )
}

export default Header;