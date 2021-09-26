import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NewTaskForm from "../../components/Pages/NewTask/NewTaskForm";

const NewTask = () => {
  return (
    <Container maxWidth="xl" sx={{ p: { md: 5, sm: 4, xs: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{ fontSize: { md: 60, xs: 40 } }}
          textAlign="center"
          // variant="h2"
        >
          Create new Task
        </Typography>
      </Box>
      <NewTaskForm />
    </Container>
  );
};

export default NewTask;
