import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import Sparkles from "../../../../FancyStuff/Sparkles";
import CTA from "../CTA";
const Headline = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography
        sx={{
          mt: { md: 16, xs: 10 },
          mb: 5,
          position: "relative",
        }}
        component="h1"
        color="primary"
        fontSize={{ md: 60, xs: 32 }}
        fontWeight="bold"
        align="center"
      >
        Welcome to{" "}
        <Sparkles>
          Hsss
          <Lamp src="/lamp.svg" />
        </Sparkles>
      </Typography>
      <Typography
        // sx={{ mb: 3 }}
        fontSize={{ md: 20, xs: 20 }}
        fontWeight="medium"
        align="center"
      >
        Connect, Support, Collaborate Online platform
      </Typography>
      <Typography
        fontSize={{ md: 20, xs: 20 }}
        fontWeight="medium"
        color="primary"
        fontStyle=""
        align="center"
      >
        Connects you with the best teacher
      </Typography>
      <CTA />
    </Box>
  );
};

export default Headline;
const Lamp = styled("img")(({ theme }) => ({
  position: "absolute",
  right: -50,
  top: "-90%",
  width: "140px",
  zIndex: -2,

  [theme.breakpoints.up("md")]: { right: -50, top: "-90%", width: "200px" },
}));
