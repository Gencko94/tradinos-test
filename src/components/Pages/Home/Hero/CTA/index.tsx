import { Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
const CTA = () => {
  return (
    <Button
      component={Link}
      to="/new-task"
      size="large"
      sx={{ m: 8, whiteSpace: "nowrap" }}
      variant="contained"
      startIcon={<ControlPointIcon />}
    >
      Create your first Task
    </Button>
  );
};

export default CTA;
