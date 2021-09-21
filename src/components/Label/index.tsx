import { Typography } from "@mui/material";

const Label: React.FC = ({ children }) => {
  return (
    <Typography
      component="label"
      color="secondary"
      sx={{ display: "block", mb: 1.5 }}
      variant="subtitle2"
    >
      {children}
    </Typography>
  );
};

export default Label;
