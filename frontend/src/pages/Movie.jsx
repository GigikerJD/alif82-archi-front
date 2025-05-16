import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { AppAuth } from "../config/AppProvider";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  ArrowBack,
  AccessTime,
  Language,
  Subtitles,
  CalendarMonth,
  Movie as MovieIcon,
  Person,
  Theaters,
  LocationOn,
  Today,
} from "@mui/icons-material";

export const Movie = () => {
  const { backendUrl } = AppAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.title === "") return <Navigate to="/" />;
    setMovieTitle(params.title);
  }, [params]);

  useEffect(() => {
    async function getMovie() {
      if (!movieTitle) return;
      setLoading(true);
      try {
        const response = await axios.get(backendUrl + `movies/${movieTitle}`, {
          validateStatus: (status) => {
            return true;
          },
        });
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement du film");
        setLoading(false);
      }
    }
    getMovie();
  }, [movieTitle, backendUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  // Format dates from array to readable format
  const formatDate = (dateArray) => {
    if (!dateArray || !Array.isArray(dateArray)) return "Date indisponible";
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString("fr-FR");
  };

  // Format time from array
  const formatTime = (timeArray) => {
    if (!timeArray || !Array.isArray(timeArray)) return "Heure indisponible";
    const [hour, minute] = timeArray;
    return `${hour}h${minute === 0 ? "00" : minute}`;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h6">Chargement en cours...</Typography>
      </Container>
    );
  }

  if (error || !movie || !movie.movie) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h6" color="error">
          {error || "Ce film n'existe pas ou une erreur s'est produite"}
        </Typography>
      </Container>
    );
  }

  const { movie: movieData, actors, showDays, theaters } = movie;

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          variant="contained"
          onClick={handleBack}
          sx={{ mb: 3, textTransform: 'none', mx: 'auto' }}
        >
          Retour
        </Button>

        {/* Movie Header */}
        <Paper
          elevation={8}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: "linear-gradient(135deg, #1a237e 0%, #0d1a5a 100%)",
            color: "white",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {movieData.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <Person sx={{ mr: 1, verticalAlign: "middle" }} />
            Réalisé par {movieData.director}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip
              icon={<AccessTime color="inherit" />}
              label={`${movieData.duration} min`}
              sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", color: "white" }}
            />
            <Chip
              icon={<Language color="inherit"/>}
              label={movieData.language}
              sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", color: "white" }}
            />
            {movieData.subtitles && (
              <Chip
                icon={<Subtitles color="inherit"/>}
                label={`Sous-titres ${movieData.subtitles}`}
                sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", color: "white" }}
              />
            )}
            {movieData.minimumAge && (
              <Chip
                label={`${movieData.minimumAge}+`}
                sx={{
                  bgcolor: movieData.minimumAge > 12 ? "#f44336" : "#ff9800",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            )}
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Left column */}
          <Grid size={{xs: 12, md: 8}}>
            {/* Projection information */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <CalendarMonth sx={{ mr: 1 }} /> Dates de projection
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{xs: 12, sm: 6}}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Début des projections
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {formatDate(movieData.startingDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs: 12, sm: 6}}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Fin des projections
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {formatDate(movieData.endDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={12}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      <Today sx={{ mr: 1, verticalAlign: "middle" }} /> Jours de
                      projection
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {showDays &&
                        showDays.map((day, index) => (
                          <Chip
                            key={index}
                            label={day}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                    </Box>
                  </Grid>
                  <Grid size={12}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Heure de projection
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {formatTime(movieData.showDay)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Actors */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Person sx={{ mr: 1 }} /> Distribution
                </Typography>
                <Grid container spacing={2}>
                  {actors &&
                    actors.map((actor) => (
                      <Grid size={{xs: 12, sm: 6}} key={actor.id}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: "primary.main",
                                  width: 50,
                                  height: 50,
                                  mr: 2,
                                }}
                              >
                                {actor.firstname[0]}
                                {actor.lastname[0]}
                              </Avatar>
                              <Box>
                                <Typography variant="h6" component="h3">
                                  {actor.firstname} {actor.lastname}
                                </Typography>
                                {actor.dob && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {formatDate(actor.dob)}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Theaters */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Theaters sx={{ mr: 1 }} /> Cinémas
                </Typography>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {theaters &&
                    theaters.map((theater, index) => (
                      <ListItem
                        key={index}
                        alignItems="flex-start"
                        sx={{
                          pl: 0,
                          borderBottom:
                            index !== theaters.length - 1
                              ? "1px solid #eee"
                              : "none",
                          pb: 2,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "secondary.main" }}>
                            <MovieIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={theater.name}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                <LocationOn
                                  sx={{
                                    fontSize: "0.8rem",
                                    mr: 0.5,
                                    verticalAlign: "middle",
                                  }}
                                />
                                {theater.address}
                              </Typography>
                              <br />
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                <LocationOn
                                  sx={{
                                    fontSize: "0.8rem",
                                    mr: 0.5,
                                    verticalAlign: "middle",
                                  }}
                                />
                                {theater.city}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>

            {/* Movie info card */}
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <MovieIcon sx={{ mr: 1 }} /> Information film
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Langue originale
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {movieData.language}
                  </Typography>
                </Box>

                {movieData.subtitles && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Sous-titres
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {movieData.subtitles}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Durée
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {movieData.duration} minutes
                  </Typography>
                </Box>

                {movieData.minimumAge && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Âge minimal
                    </Typography>
                    <Chip
                      label={`${movieData.minimumAge} ans et plus`}
                      color={movieData.minimumAge > 12 ? "error" : "warning"}
                      size="small"
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
