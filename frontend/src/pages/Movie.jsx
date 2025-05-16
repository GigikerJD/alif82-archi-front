import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import { AppAuth } from "../config/AppProvider";
import { Container } from "@mui/material";


const Movie = () => {
    const { backendUrl } = AppAuth();
    const params = useParams();
    const [movieTitle, setMovieTitle] = useState("");

    useEffect(() => {
        if(params.title === "") return <Navigate to="/"/>
        
        setMovieTitle(params.title);
    }, [params]);

    useEffect(() => {
        async function getMovie(){
            const response = await axios.get(backendUrl +  `movie/${movieTitle}`, {
                validateStatus: (status) => { return true; }
            })
        }
    });

    return(
        <>
            <Container maxWidth="xl" fluid>

            </Container>
        </>
    )
}

export default Movie;