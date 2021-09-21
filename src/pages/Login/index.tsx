import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../../components/Logo";
import LoginForm from "../../components/Pages/Login/LoginForm";
import Sparkles from "../../components/FancyStuff/Sparkles";
const Login = () => {
  return (
    <Container maxWidth="sm">
      <Box
        my={4}
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Typography gutterBottom variant="h4" fontWeight="700" align="center">
          Login to <Sparkles>Hisss</Sparkles>
        </Typography>

        <Logo />
      </Box>

      <LoginForm />
    </Container>
  );
};

export default Login;
