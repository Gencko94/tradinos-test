import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#280346" },
    secondary: { main: "hsl(31, 100%, 60%)" },
  },
  typography: {
    fontFamily: "Maven Pro , Roboto, Helvetica",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
