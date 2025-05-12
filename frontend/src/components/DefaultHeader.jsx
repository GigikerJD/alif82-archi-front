import { Container, Divider, IconButton, Link, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { AppAuth } from "../config/AppProvider";
import { useNavigate } from "react-router-dom";

export const DefaultHeader = () => {
  const { login } = AppAuth();
  const navigate = useNavigate();

  return (
    <>
      <Container
        component="header"
        maxWidth
        sx={{
          mb: 3,
          bgcolor: "black",
          color: "#c0965e",
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          divider={<Divider orientation="vertical" variant="fullWidth" />}
          sx={{
            p: 1,
            justifyContent: "center",
            alignItems: "center",
            color: "#c0965e",
          }}
        >
          <Link
            underline="none"
            href="/"
            sx={{ color: "inherit", fontSize: 20, fontWeight: 700 }}
          >
            Accueil
          </Link>
          <Link
            underline="none"
            href="/news"
            sx={{ color: "inherit", fontSize: 20, fontWeight: 700 }}
          >
            À la une
          </Link>
          <Link
            underline="none"
            href="/studios"
            sx={{ color: "inherit", fontSize: 20, fontWeight: 700 }}
          >
            Les studios
          </Link>
          <IconButton
            onClick={() => {
              navigate("/forms");
            }}
            sx={{ color: "inherit", marginLeft: "auto" }}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Stack>
      </Container>
    </>
  );
};
