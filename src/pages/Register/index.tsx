import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../../components/Logo";
import Sparkles from "../../components/FancyStuff/Sparkles";
import RegisterForm from "../../components/Pages/Register/RegisterForm";
const Register = () => {
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
          Register on <Sparkles>Hisss</Sparkles>
        </Typography>

        <Logo />
      </Box>

      <RegisterForm />
    </Container>
  );
};

export default Register;
