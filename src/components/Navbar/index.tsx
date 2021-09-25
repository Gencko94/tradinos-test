import { AppBar, Toolbar } from "@mui/material";

import { Box } from "@mui/system";
import Logo from "../Logo";
import NavLinks from "./Navlinks";
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="div" elevation={4} position="static">
        <Toolbar sx={{ alignItems: "center", p: 2 }}>
          <Box alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>

          <NavLinks />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
