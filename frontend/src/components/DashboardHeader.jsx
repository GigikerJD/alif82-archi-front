import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { AppAuth } from "../config/AppProvider";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { Logout } from "@mui/icons-material";

export const DashboardHeader = () => {
    const { backendUrl, user, logout } = AppAuth();
    const [owner, setOwner] = useState({});

    useEffect(() => {
        async function getOwner() {
            try {
                const response = await axios.get(`${backendUrl}owners/${user}`, {
                    validateStatus: (status) => true,
                });
                setOwner(response.data.owner);
            } catch (error) {
                console.error("Error fetching owner data:", error);
            }
        }
        getOwner();
    }, [backendUrl, user, user.email]);

    return (
        <Container
            component="header"
            maxWidth={false}
            sx={{
                bgcolor: 'black',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2
            }}
        >
            <Typography variant="h5">Bonjour <Box component="span" sx={{ fontWeight: 700 }}>{`${owner.firstname}`.toUpperCase()}</Box></Typography>
            <IconButton size="large" onClick={logout}>
                <Logout color="error"/>
            </IconButton>
        </Container>
    );
};
