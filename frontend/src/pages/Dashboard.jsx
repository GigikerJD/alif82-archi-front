import { Button, Container, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { AppAuth } from "../config/AppProvider";


const Dashboard = () => {
    const location = useLocation();
    const { logout } = AppAuth();

    return(
        <>
            <Container fixed>
                
            </Container>
        </>
    )
}

export default Dashboard;