import { styled } from "@mui/system";
import { useHistory } from "react-router";

const Logo = () => {
  const history = useHistory();
  return (
    <LogoImg
      onClick={() => history.push("/")}
      src="/logo.svg"
      alt="hisss logo"
    />
  );
};

export default Logo;

const LogoImg = styled("img")(({ theme }) => ({
  cursor: "pointer",
  maxHeight: "50px",
  [theme.breakpoints.down("md")]: {
    maxHeight: "50px",
  },
}));
