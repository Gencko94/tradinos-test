import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Features from "../../components/Pages/Home/Features";
import Hero from "../../components/Pages/Home/Hero";
import HowItWorks from "../../components/Pages/Home/HowItWorks";

const Home = () => {
  return (
    <Box>
      <Hero />
      <HowItWorks />
      <Features />
    </Box>
  );
};

export default Home;
