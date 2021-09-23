import { Box } from "@mui/system";
import Navbar from "../Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{ backgroundColor: "grey.100", minHeight: `calc(100vh - 89px)` }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
