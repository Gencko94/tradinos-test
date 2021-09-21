import { Container, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

const HowItWorks = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('grass.svg')",
        minHeight: "100vh",
        objectFit: "cover",
        p: { md: 20, sm: 8, xs: 2 },
        position: "relative",
      }}
    >
      <Container>
        <Box>
          <Typography
            align="center"
            component="h3"
            fontSize={{ md: 50, xs: 32 }}
            fontWeight="regular"
            sx={{ position: "relative", mb: 12 }}
          >
            How it{" "}
            <span style={{ position: "relative" }}>
              works
              <Arrow src="/arrow.svg" />
            </span>
          </Typography>
          <Box
            sx={{
              position: "relative",
              //   width: { md: 200, xs: 100 },
              height: { md: 250, xs: 175 },
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "primary.main",
              borderRadius: "12px",
            }}
          >
            <Video src="/video.svg" />
          </Box>
        </Box>
      </Container>
      <SittingGuy src="/sittingguy.svg" />
      <SittingGirl src="/sittinggirl.svg" />
    </Box>
  );
};

export default HowItWorks;
const Arrow = styled("img")(({ theme }) => ({
  position: "absolute",
  right: -50,
  top: "-80%",
  width: "140px",

  [theme.breakpoints.up("md")]: { right: -50, top: "-80%", width: "200px" },
}));
const Video = styled("img")(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  width: "100px",

  [theme.breakpoints.up("md")]: {
    left: "50%",
    top: "50%",
    width: "170px",
    height: "150px",
  },
}));
const SittingGuy = styled("img")(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: "50%",
  width: "140px",
  zIndex: 1,

  [theme.breakpoints.up("md")]: { left: "0", top: "-10%", width: "200px" },
}));
const SittingGirl = styled("img")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: "40%",
  width: "140px",
  zIndex: 1,

  [theme.breakpoints.up("md")]: { right: "0", top: "-10%", width: "200px" },
}));
