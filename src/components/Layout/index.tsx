import { Box } from "@mui/system";
import Navbar from "../Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          // backgroundColor: "background.default",
          minHeight: `calc(100vh - 89px)`,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
