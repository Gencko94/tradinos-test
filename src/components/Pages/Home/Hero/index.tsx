import { Container } from "@mui/material";

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
