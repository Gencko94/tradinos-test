import { Typography } from "@mui/material";

const Label: React.FC = ({ children }) => {
  return (
    <Typography
      component="label"
      color="secondary"
      sx={{ display: "block", mb: 1.5, fontSize: { md: 18, xs: 15 } }}
      fontWeight="500"
    >
      {children}
    </Typography>
  );
};

export default Label;
