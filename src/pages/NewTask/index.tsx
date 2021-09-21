import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NewTaskForm from "../../components/Pages/NewTask/NewTaskForm";
import useAddTask from "../../hooks/useAddTask";

const NewTask = () => {
  return (
    <Container sx={{ p: { md: 8, sm: 4, xs: 2 } }}>
      <Box sx={{ mb: 8 }}>
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
