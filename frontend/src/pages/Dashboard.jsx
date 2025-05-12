import { Button, Container, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { AppAuth } from "../config/AppProvider";


export const Dashboard = () => {
    const location = useLocation();
    const { logout } = AppAuth();

    return(
        <>
            <Container fixed>
                <Typography>Je suis connecté</Typography>
                <Typography>Page actuelle : {location.pathname}</Typography>
                <Button variant="contained" color="error" onClick={() => logout()}>Se déconnecter</Button>
            </Container>
        </>
    )
}