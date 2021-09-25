import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { getInitialColorMode } from "../helpers/getInitialColorMode";
import { getDesignTokens } from "../styles/globalTheme";
export type COLOR_MODES = "light" | "dark";

interface ContextProps {
  colorMode: COLOR_MODES;
  handleToggleColorMode: () => void;
}

export const ApplicationContext = createContext<Partial<ContextProps>>({});

const ApplicationProvider: React.FC = ({ children }) => {
  const [colorMode, setColorMode] = useState<COLOR_MODES>(
    getInitialColorMode()
  );
  const theme = useMemo(() => createTheme(getDesignTokens(colorMode)), [
    colorMode,
  ]);
  function handleToggleColorMode() {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  }
  return (
    <ApplicationContext.Provider value={{ handleToggleColorMode, colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
