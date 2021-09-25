import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
const NavLinks = () => {
  const { colorMode, handleToggleColorMode } = useContext(ApplicationContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box alignItems="center" justifyContent="center">
      <Button
        component={Link}
        to="/new-task"
        color="inherit"
        sx={{
          display: { md: "inline-block", xs: "none" },
        }}
      >
        Create New Task
      </Button>

      <Button
        component={Link}
        to="/tasks"
        color="inherit"
        sx={{
          display: { md: "inline-block", xs: "none" },
        }}
      >
        Tasks
      </Button>
      <Button
        component={Link}
        color="inherit"
        to="/login"
        sx={{
          display: { md: "inline-block", xs: "none" },
        }}
      >
        Login
      </Button>
      <Button
        component={Link}
        color="inherit"
        to="/register"
        variant="outlined"
        sx={{
          display: { md: "inline-block", xs: "none" },
        }}
      >
        Register
      </Button>
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => handleToggleColorMode?.()}
        color="inherit"
      >
        {colorMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "#fff", display: { md: "none" } }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose();
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            history.push("/login");
            handleClose();
          }}
        >
          Login
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/register");
            handleClose();
          }}
        >
          Register
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/tasks");
            handleClose();
          }}
        >
          Tasks
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/new-task");
            handleClose();
          }}
        >
          Create New Task
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavLinks;
