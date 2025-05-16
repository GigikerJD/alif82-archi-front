import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActionArea,
} from "@mui/material";
import { AppAuth } from "../config/AppProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultMovieImage from "../assets/images/The Dark Knight.webp";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { backendUrl } = AppAuth();
  const [movies, setMovies] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllMovies() {
      const response = await axios.get(backendUrl + "movies", {
        validateStatus: (status) => {
          return true;
        },
      });
      setMovies(response.data);
    }
    getAllMovies();
  }, [backendUrl]);

  const getMovieImagePath = (title) => {
    try {
      const formattedTitle = title.replace(/\s+/g, " ").trim();
      return new URL(`../assets/images/${formattedTitle}.webp`, import.meta.url)
        .href;
    } catch (error) {
      console.error(`Error loading image for ${title}:`, error);
      return defaultMovieImage;
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ p: 2 }}>
          {movies && movies.data && movies.data.length > 0 ? (
            <Grid container spacing={4}>
              {movies.data.map((movieData, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card>
                    <CardActionArea onClick={() => {
                      navigate("/movie/" + movieData.movie.title)
                    }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={getMovieImagePath(movieData.movie.title)}
                        alt={movieData.movie.title}
                        onError={(e) => {
                          console.log(
                            `Failed to load image for ${movieData.movie.title}`
                          );
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = defaultMovieImage;
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {movieData.movie.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Director: {movieData.movie.director}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {movieData.movie.duration} minutes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Language: {movieData.movie.language}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Subtitles: {movieData.movie.subtitles}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Minimum Age: {movieData.movie.minimumAge}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Starting Date:{" "}
                          {Array.isArray(movieData.movie.startingDate)
                            ? movieData.movie.startingDate.join("/")
                            : movieData.movie.startingDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          End Date:{" "}
                          {Array.isArray(movieData.movie.endDate)
                            ? movieData.movie.endDate.join("/")
                            : movieData.movie.endDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Show Time:{" "}
                          {Array.isArray(movieData.movie.showDay)
                            ? movieData.movie.showDay.join(":")
                            : movieData.movie.showDay}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cities:{" "}
                          {Array.isArray(movieData.cities)
                            ? movieData.cities.join(", ")
                            : movieData.cities}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">
              {message || "No movies found."}
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};
