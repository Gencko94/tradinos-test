import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  CardMedia,
} from "@mui/material";

import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router";
import Logo from "../Logo";
import NavLinks from "./Navlinks";
const Navbar = () => {
  const { push } = useHistory();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} color="primary" position="static">
        <Toolbar sx={{ alignItems: "center", p: 2 }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          <NavLinks />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
