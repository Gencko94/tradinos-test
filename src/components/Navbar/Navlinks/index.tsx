import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useHistory } from "react-router";
const NavLinks = () => {
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
        sx={{
          color: "primary.contrastText",

          display: { md: "inline-block", xs: "none" },
        }}
      >
        Create New Task
      </Button>

      <Button
        component={Link}
        to="/tasks"
        sx={{
          color: "primary.contrastText",
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
          color: "primary.contrastText",
          display: { md: "inline-block", xs: "none" },
        }}
      >
        Login
      </Button>
      <Button
        component={Link}
        color="inherit"
        to="/register"
        sx={{
          color: "primary.contrastText",
          display: { md: "inline-block", xs: "none" },
        }}
      >
        Register
      </Button>
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
