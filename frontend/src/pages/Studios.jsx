import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppAuth } from "../config/AppProvider";
import { Autocomplete, TextField, Card, CardContent, CardMedia, Grid, Typography, Container } from "@mui/material";
import defaultMovieImage from "../assets/images/Inception.webp";

export const Studios = () => {
  const { backendUrl } = AppAuth();
  const [movies, setMovies] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]); // Villes dynamiques depuis l'API

  // Charger les villes depuis l'API au chargement du composant
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${backendUrl}cities`);
        if (response.data.type === "success") {
          setCities(response.data.cities);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        // Fallback avec des villes par défaut en cas d'erreur
        setCities(["Paris", "Lyon", "Marseille", "Toulouse"]);
      }
    };

    fetchCities();
  }, [backendUrl]);

  useEffect(() => {
    if (city) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(`${backendUrl}movies/city?name=${city}`, {
            validateStatus: (status) => { return true; }
          });
          if (response.data.type === "success") {
            setMovies(response.data.movies);
          } else {
            setMovies([]);
          }
        } catch (error) {
          console.error("Error fetching movies:", error);
          setMovies([]);
        }
      };

      fetchMovies();
    } else {
      setMovies([]);
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
        value={city}
        style={{ margin: "20px 0" }}
      />

      {city && movies.length === 0 && (
        <Typography variant="h6" color="text.secondary" style={{ textAlign: "center", marginTop: "20px" }}>
          No movies found in {city}
        </Typography>
      )}

      <Grid container spacing={4}>
        {movies.map((movie, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={getMovieImagePath(movie.title)}
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