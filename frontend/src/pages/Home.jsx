import {
  ButtonGroup,
  Button,
  Container,
  Link,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { AppAuth } from "../config/AppProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const { backendUrl } = AppAuth();
  const [movies, setMovies] = useState(null);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");

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
      const response = await axios.get(backendUrl + "movies/cities", {
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
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ border: "1px solid lightblue" }}>
        <Tabs 
            visibleScrollbar 
            variant="fullWidth"
            centered
            sx={{
                
            }}
        >
          {cities.map((city, index) => (
            <>
              <Tab label={city} value={index} />
            </>
          ))}
        </Tabs>

        <Box component="pre">{JSON.stringify(movies, null, 2)}</Box>
      </Container>
    </>
  );
};
