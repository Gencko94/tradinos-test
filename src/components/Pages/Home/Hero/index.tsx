import { Container, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import CTA from "./CTA";
import Headline from "./Headline";

const Hero = () => {
  return (
    <Container
      sx={{
        position: "relative",
        // minHeight: "100vh",
      }}
    >
      <Headline />
    </Container>
  );
};

export default Hero;
