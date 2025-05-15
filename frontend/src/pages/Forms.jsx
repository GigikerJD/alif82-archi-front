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
import toast from "react-hot-toast";
 
export const Forms = () => {
  const { login, backendUrl } = AppAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      DOB: "",
      movieTheatre: "",
      adresse: "",
    },
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      setRegisterLoading(true);
      alert(JSON.stringify(values, null, 2));
      setTimeout(() => {
        setRegisterLoading(false);
      }, 2000);
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
      setLoginLoading(true);
      const response = await axios.post(backendUrl + "/api/login", {
        email: values.email,
        password: values.email
      })
      const status = response.status;
      switch(status){
        case 200:
          toast.success(response.data.message)
          await new Promise((resolve) => setTimeout(resolve, 1500));
          login(response.data.email);
          break;
        case 404:
          toast.error(response.data);
          break;
      }

      alert(JSON.stringify(values, null, 2));
      login("");
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
              type="email"
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
              disabled={loginLoading}
              startIcon={<Outbound />}
              sx={{
                mt: 3,
                textTransform: "none",
                fontSize: 17,
                letterSpacing: 0,
              }}
            >
              {loginLoading ? "Chargement..." : "Se connecter"}
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

            <TextField
              type="text"
              name="adresse"
              size="small"
              label="Adresse"
              fullWidth
              onChange={registerFormik.handleChange}
              value={registerFormik.values.adresse}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={registerLoading}
              startIcon={<Outbound />}
              sx={{
                mt: 3,
                textTransform: "none",
                fontSize: 17,
                letterSpacing: 0,
              }}
            >
              {registerLoading ? "Chargement..." : "S'inscrire"}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};