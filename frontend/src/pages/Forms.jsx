import { Outbound } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { AppAuth } from "../config/AppProvider";
import toast, { Toaster } from "react-hot-toast";
 
const Forms = () => {
  const { login, backendUrl } = AppAuth();
  const [tabValue, setTabValue] = useState(0);

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      DOB: "",
      movieTheatre: "",
      adresse: "",
      city: "",
    },
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      const response = await axios.post(backendUrl + "register", {
        values
      }, {
        validateStatus: (status) => {
          return true;
        }
      }
    );
      const type = response.data.type;
      switch(type){
        case "error":
          toast.error(response.data.message);
          break;
        case "success":
          toast.success(response.data.message);
          login(values.email);
          break;
      }
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      const response = await axios.post(backendUrl + "login", {
        email: values.email,
        password: values.password
      }, {
        validateStatus: (status) => {
          return true;
        }
      });
      console.log(response.data);
      const type = response.data.type;
      switch(type){
        case "error":
          toast.error(response.data.message);
          break;
        case "success":
          toast.success(response.data.message);
          login(values.email);
          break;
      }
    },
  });

  const changeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ my: 3.5 }}>
      <Tabs value={tabValue} onChange={changeTab} variant="fullWidth" sx={{ width: '60%', margin: '0 auto' }}>
        <Tab label="Se connecter" />
        <Tab label="S'inscrire" />
      </Tabs>
      <Toaster position="top-right" reverseOrder={true} />
      {tabValue === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          mt={{ xs: 2, sm: 4 }}
        >
          <Typography variant="h5" fontWeight={700}>
            Connectez-vous à votre espace
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
            width="100%"
            maxWidth="400px"
            onSubmit={loginFormik.handleSubmit}
          >
            <TextField
              name="email"
              label="Email"
              size="small"
              placeholder="Veuillez taper votre adresse email"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.email}
              fullWidth
            />

            <TextField
              type="password"
              name="password"
              label="Mot de passe"
              size="small"
              placeholder="Veuillez taper votre mot de passe"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.password}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<Outbound />}
              sx={{
                mt: 3,
                textTransform: "none",
                fontSize: 17,
                letterSpacing: 0,
              }}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={5}
          mt={{ xs: 2, md: 4 }}
        >
          <Typography variant="h5" fontWeight={700}>
            Rejoignez la communauté
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
            width="100%"
            maxWidth="450px"
            onSubmit={registerFormik.handleSubmit}
          >
            <Box
              sx={{
                width: '100%',
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                rowGap: 3
              }}
            >
              <TextField
                type="text"
                name="firstname"
                label="Prénom"
                size="small"
                placeholder="Votre prénom"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.firstname}
              />
              <TextField
                type="text"
                name="lastname"
                label="Nom"
                size="small"
                placeholder="Votre nom"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.lastname}
              />
            </Box>

            <TextField
              type="email"
              name="email"
              placeholder="exemple@hotmail.com"
              label="Email"
              size="small"
              fullWidth
              onChange={registerFormik.handleChange}
              value={registerFormik.values.email}
            />

            <TextField
              type="password"
              name="password"
              placeholder="**********************"
              label="Mot de passe"
              size="small"
              fullWidth
              onChange={registerFormik.handleChange}
              value={registerFormik.values.password}
            />

            <TextField
              type="date"
              name="DOB"
              size="small"
              fullWidth
              onChange={registerFormik.handleChange}
              value={registerFormik.values.DOB}
            />

            <TextField
              type="text"
              name="movieTheatre"
              size="small"
              label="Nom du cinéma"
              fullWidth
              onChange={registerFormik.handleChange}
              value={registerFormik.values.movieTheatre}
            />

            <Box
              sx={{
                width: '100%',
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                rowGap: 3,
                columnGap: 2
              }}
            >
              <TextField
                name="adresse"
                label="Adresse"
                size="small"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.adresse}
                sx={{ width: { md: '60%'}, borderRadius: 10 }}
              />
              <TextField
                name="city"
                label="Ville"
                size="small"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.city}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<Outbound />}
              sx={{
                mt: 3,
                textTransform: "none",
                fontSize: 17,
                letterSpacing: 0,
              }}
            >
              s'inscrire
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Forms;