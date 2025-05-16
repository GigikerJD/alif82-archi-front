import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  Box,
  Modal,
  CardHeader,
  Stack,
  IconButton,
  Paper,
  Autocomplete,
  Chip,
  Alert,
} from "@mui/material";
import { Add as AddIcon, Movie as MovieIcon, Close as CloseIcon } from "@mui/icons-material";
import { AppAuth } from "../config/AppProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const { backendUrl, user } = AppAuth();
  
  // États pour les films et les données
  const [movies, setMovies] = useState([]);
  const [acteurs, setActeurs] = useState([]);
  const [days, setDays] = useState([]);
  
  // États pour le modal et le chargement
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  
  // État pour le formulaire
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    director: '',
    language: '',
    subtitles: '',
    startingDate: '',
    endDate: '',
    minimumAge: '',
    showDay: '',
    acteurs: [],
    days: [],
    emailOwner: user,
  });

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.title.trim()) {
      setAlert({ show: true, message: 'Le titre est requis', severity: 'error' });
      return;
    }
    if (!formData.director.trim()) {
      setAlert({ show: true, message: 'Le réalisateur est requis', severity: 'error' });
      return;
    }
    if (!formData.language.trim()) {
      setAlert({ show: true, message: 'La langue est requise', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Préparer les données selon le format attendu par l'API
      const movieData = {
        title: formData.title,
        duration: parseInt(formData.duration) || 0,
        director: formData.director,
        language: formData.language,
        subtitles: formData.subtitles || null,
        startingDate: formData.startingDate || null,
        endDate: formData.endDate || null,
        minimumAge: parseInt(formData.minimumAge) || 0,
        showDay: formData.showDay || null,
        acteurs: formData.acteurs,
        days: formData.days,
        emailOwner: user,
      };

      const response = await axios.post(`${backendUrl}movies`, movieData, {
        validateStatus: (status) => { return true; }
      });
      
      if (response.data.type === 'success') {
        setAlert({ show: true, message: 'Film ajouté avec succès!', severity: 'success' });
        setOpenModal(false);
        resetForm();
        fetchMovies(); // Rafraîchir la liste
      } else {
        setAlert({ show: true, message: response.data.message || 'Erreur lors de l\'ajout', severity: 'error' });
      }
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage = error.response?.data?.message || 'Erreur lors de l\'ajout du film';
      setAlert({ show: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      title: '',
      duration: '',
      director: '',
      language: '',
      subtitles: '',
      startingDate: '',
      endDate: '',
      minimumAge: '',
      showDay: '',
      acteurs: [],
      days: [],
      emailOwner: user || '',
    });
  };

  // Récupérer les films de l'utilisateur
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${backendUrl}owners/${user}/movies`, {
        validateStatus: (status) => { return true; }
      });
      
      // Les films sont dans response.data.moviesDetails selon l'endpoint
      if (response.data.type === 'success') {
        // Extraire seulement les objets movie des détails
        const movies = response.data.moviesDetails.map(detail => detail.movie);
        setMovies(movies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des films:', error);
      setMovies([]);
    }
  };

  // Récupérer les acteurs disponibles
  const fetchActeurs = async () => {
    try {
      const response = await axios.get(`${backendUrl}actors`, {
        validateStatus: (status) => { return true; }
      });
      
      if (response.data.type === 'success') {
        setActeurs(response.data.actors);
      } else {
        setActeurs([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des acteurs:', error);
      setActeurs([]);
    }
  };

  // Récupérer les jours disponibles
  const fetchDays = async () => {
    try {
      const response = await axios.get(`${backendUrl}days`, {
        validateStatus: (status) => { return true; }
      });
      
      if (response.data.days) {
        setDays(response.data.days);
      } else {
        setDays([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des jours:', error);
      setDays([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMovies();
      fetchActeurs();
      fetchDays();
    }
  }, [user]);

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  return (
    <>
      <Container 
        fixed
        sx={{ mt: 8 }}
      >
        {/* Alert */}
        {alert.show && (
          <Alert 
            severity={alert.severity} 
            onClose={handleCloseAlert}
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        )}

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Mes Films
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            size="large"
          >
            Ajouter un film
          </Button>
        </Box>

        {/* Liste des films */}
        <Grid container spacing={3}>
          {movies.length === 0 ? (
            <Grid size={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <MovieIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Aucun film trouvé
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Commencez par ajouter votre premier film
                </Typography>
              </Paper>
            </Grid>
          ) : (
            movies.map((movie) => (
              <Grid size={{xs: 12, sm: 6, md: 4}} key={movie.title}>
                <Card sx={{ height: '100%' }}>
                  <CardHeader
                    title={movie.title}
                    subheader={`Réalisé par ${movie.director}`}
                  />
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Durée:</strong> {movie.duration} minutes
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Langue:</strong> {movie.language}
                      </Typography>
                      {movie.subtitles && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Sous-titres:</strong> {movie.subtitles}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        <strong>Âge minimum:</strong> {movie.minimumAge} ans
                      </Typography>
                      {movie.startingDate && movie.endDate && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Période:</strong> {new Date(movie.startingDate).toLocaleDateString()} - {new Date(movie.endDate).toLocaleDateString()}
                        </Typography>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Modal pour ajouter un film */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="add-movie-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '60%' },
            maxWidth: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 0,
            maxHeight: '60vh',
            overflow: 'auto'
          }}>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h2">
                Ajouter un nouveau film
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
              <Grid container spacing={2}>
                {/* Titre */}
                <Grid size={12}>
                  <TextField
                    fullWidth
                    required
                    name="title"
                    size="small"
                    label="Titre du film"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Durée et Âge minimum */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name="duration"
                    label="Durée (minutes)"
                    type="number"
                    size="small"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name="minimumAge"
                    label="Âge minimum"
                    type="number"
                    size="small"
                    value={formData.minimumAge}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Réalisateur */}
                <Grid size={12}>
                  <TextField
                    fullWidth
                    required
                    name="director"
                    size="small"
                    label="Réalisateur"
                    value={formData.director}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Langue et Sous-titres */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    required
                    name="language"
                    size="small"
                    label="Langue"
                    value={formData.language}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name="subtitles"
                    size="small"
                    label="Sous-titres"
                    value={formData.subtitles}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Dates */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name="startingDate"
                    label="Date de début"
                    type="date"
                    size="small"
                    value={formData.startingDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name="endDate"
                    label="Date de fin"
                    type="date"
                    size="small"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Heure de diffusion */}
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name="showDay"
                    label="Heure de diffusion"
                    type="time"
                    size="small"
                    value={formData.showDay}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Sélection des acteurs */}
                <Grid size={12}>
                  <Autocomplete
                    multiple
                    size="small"
                    options={acteurs}
                    getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                    value={formData.acteurs}
                    onChange={(event, newValue) => {
                      setFormData(prev => ({ ...prev, acteurs: newValue }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Acteurs"
                        placeholder="Sélectionnez les acteurs"
                      />
                    )}
                  />
                </Grid>

                {/* Sélection des jours */}
                <Grid size={12}>
                  <Autocomplete
                    multiple
                    size="small"
                    options={days}
                    getOptionLabel={(option) => option.day}
                    value={formData.days}
                    onChange={(event, newValue) => {
                      setFormData(prev => ({ ...prev, days: newValue }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Jours de diffusion"
                        placeholder="Sélectionnez les jours"
                      />
                    )}
                  />
                </Grid>

                {/* Boutons */}
                <Grid size={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                    size="small"
                      variant="outlined"
                      onClick={handleCloseModal}
                      disabled={loading}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? 'Ajout en cours...' : 'Ajouter le film'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;