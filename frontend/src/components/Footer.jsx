import { Container, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <>
      <Container 
        component="footer" 
        maxWidth
        sx={{
            bgcolor: "black",
            color: 'whitesmoke',
            p: 1,
            fontFamily: 'Open Sans'
        }}
      >
        <Typography textAlign='center' variant="body2" sx={{ fontFamily: 'inherit'}}>@ Tous droits réservés</Typography>
      </Container>
    </>
  );
};
