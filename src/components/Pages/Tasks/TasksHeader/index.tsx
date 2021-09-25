import { InputBase, Paper, Typography } from "@mui/material";
import { alpha, Box, styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";
interface IProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TasksHeader = ({ search, setSearch }: IProps) => {
  return (
    <Box
      mb={6}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Typography
        sx={{ fontSize: { md: 60, xs: 40 } }}
        textAlign="center"
        variant="h2"
      >
        Your Tasks
      </Typography>
      <Search elevation={6}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a task…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
};

export default TasksHeader;
const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // border: `1px solid ${theme.palette.secondary.main}`,
  // backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //@ts-ignore
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
