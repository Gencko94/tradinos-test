import { Typography } from "@mui/material";

const Label: React.FC = ({ children }) => {
  return (
    <Typography
      component="label"
      sx={{ display: "block", mb: 1.5, fontSize: 15 }}
      fontWeight="500"
    >
      {children}
    </Typography>
  );
};

export default Label;
