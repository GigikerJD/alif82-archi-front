import { useState, useEffect } from "react";
import axios from "axios";

export const Studios = () => {
    const [movies, setMovies] = useState(null);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/mysql_war_exploded/api/movies');
                const status = response.status;
                setStatus(status);

                switch (status) {
                    case 200:
                        setMovies(response.data);
                        break;
                    case 404:
                        setMessage(response.data.message);
                        break;
                    default:
                        setMessage("An unexpected error occurred.");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMessage("Failed to fetch movies.");
            }
        };

        fetchMovies();
    }, []);

    return (
        <>
            {status === 200 && movies && (
                <pre>
                    {JSON.stringify(movies, null, 2)}
                </pre>
            )}
            {status === 404 && (
                <span>{message}</span>
            )}
            {movies === null && (
                <>
                    <span>Aucun film à la une !</span>
                </>
            )}
        </>
    );
};
