import { Paper, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

interface IProps {
  title: string;
  image: string;
  desc: string;
  stats: string;
  borderColor: string;
}

const Feature = ({ borderColor, desc, image, title, stats }: IProps) => {
  return (
    <Paper
      component={Box}
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      elevation={0}
      p={2}
      sx={{ borderColor, borderStyle: "solid", borderWidth: "1px" }}
    >
      <Image src={image} />
      <Typography variant="h6" sx={{ mt: 6 }} align="center">
        {title}
      </Typography>
      <Typography align="center">{desc}</Typography>
    </Paper>
  );
};

export default Feature;
const Image = styled("img")(({ theme }) => ({
  maxHeight: "150px",

  [theme.breakpoints.up("md")]: {
    maxHeight: "150px",
  },
}));
