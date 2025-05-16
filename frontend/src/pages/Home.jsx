import {
  ButtonGroup,
  Button,
  Container,
  Link,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { AppAuth } from "../config/AppProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import myPic from "../assets/images/Inception.webp";

const Home = () => {
  const { backendUrl } = AppAuth();
  const [movies, setMovies] = useState(null);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

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

  useEffect(() => {
    async function getCities() {
      const response = await axios.get(backendUrl + "cities", {
        validateStatus: (status) => {
          return true;
        },
      });
      const type = response.data.type;
      switch (type) {
        case "error":
          setMessage(response.data.message);
          break;
        default:
          setCities(response.data.cities);
          break;
      }
    }
    getCities();
  }, [backendUrl]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getMoviesByCity = (city) => {
    if (!movies || !movies.data) return [];
    return movies.data.filter((movieData) =>
      movieData.cities.includes(city)
    );
  };

  return (
    <>
      <Container maxWidth="lg">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="black"
          centered
          sx={{
            mb: 4,
            fontWeight: 700
          }}
        >
          {cities.map((city, index) => (
            <Tab key={index} label={city} value={index} />
          ))}
        </Tabs>

        <Box sx={{ p: 2 }}>
          {cities.length > 0 && (
            <Grid container spacing={4}>
              {getMoviesByCity(cities[selectedTab]).map((movieData, index) => (
                <Grid size={{xs: 12, sm: 6, md: 4}}  key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200px"
                      width="200px"
                      image={myPic}
                      alt={movieData.movie.title}
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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;