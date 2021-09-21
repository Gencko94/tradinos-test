import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NewTaskForm from "../../components/Pages/NewTask/NewTaskForm";
import useAddTask from "../../hooks/useAddTask";

const NewTask = () => {
  return (
    <Container sx={{ p: 4 }} maxWidth="lg">
      <Box
        sx={{ mb: 8 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          fontWeight="bold"
          sx={{ fontSize: { md: 50, xs: 35 } }}
          align="center"
        >
          Create new Task
        </Typography>
      </Box>
      <NewTaskForm />
    </Container>
  );
};

export default NewTask;
