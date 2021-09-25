import { ThemeOptions } from "@mui/material";
import { COLOR_MODES } from "../contexts/ApplicationContext";

export const getDesignTokens = (mode: COLOR_MODES): ThemeOptions => ({
  typography: {
    fontFamily: "Maven Pro , Roboto, Helvetica",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: false,
      },
    },
  },
  ...(mode === "light" ? getLightTheme() : getDarkTheme()),
});
export const getLightTheme = (): ThemeOptions => ({
  palette: {
    primary: { main: "#710e5a", light: "#5a034f", dark: "#330036" },
    secondary: { main: "#4D042F" },
    mode: "light",
  },
});
export const getDarkTheme = (): ThemeOptions => ({
  palette: {
    primary: { main: "#b880a7", light: "#d4b2c9", dark: "#86306f" },
    secondary: { main: "#d07e9e" },
    mode: "dark",
    background: { paper: "#170F17", default: "#151115" },
  },
});
