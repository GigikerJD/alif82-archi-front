import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppAuth } from "../config/AppProvider";
import { Autocomplete, TextField, Card, CardContent, CardMedia, Grid, Typography, Container } from "@mui/material";

export const Studios = () => {
  const { backendUrl } = AppAuth();
  const [movies, setMovies] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState(["Paris", "Lyon", "Marseille", "Toulouse"]); // Exemple de villes

  useEffect(() => {
    if (city) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(`${backendUrl}movies/city?name=${city}`);
          setMovies(response.data.movies);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    }
  }, [city, backendUrl]);

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
    <Container>
      <Autocomplete
        options={cities}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Select a city" variant="outlined" />}
        onChange={(event, newValue) => {
          setCity(newValue);
        }}
        style={{ margin: "20px 0" }}
      />

      <Grid container spacing={4}>
        {movies.map((movie, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={getMovieImagePath(movie.title)} // Remplacez par le chemin de l'image du film
                alt={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Director: {movie.director}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {movie.duration} minutes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Language: {movie.language}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subtitles: {movie.subtitles}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum Age: {movie.minimumAge}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
