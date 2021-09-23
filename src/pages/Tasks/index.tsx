import { Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Task from "../../components/Pages/Tasks/Task";
import TasksHeader from "../../components/Pages/Tasks/TasksHeader";
import { AnimateSharedLayout } from "framer-motion";
import { Box } from "@mui/system";
import CTA from "../../components/Pages/Home/Hero/CTA";
import useGetTasks from "../../hooks/useGetTasks";
import useGetCategories from "../../hooks/useGetCategories";
const Tasks = () => {
  const [search, setSearch] = useState("");
  const { data, status } = useGetTasks();
  const { status: categoriesStatus } = useGetCategories();
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
  const handleExpand = (index: number) => {
    if (expandedTasks.includes(index)) {
      setExpandedTasks((prev) => prev.filter((i) => i !== index));
    } else {
      setExpandedTasks((prev) => [...prev, index]);
    }
  };
  if (status === "loading" || categoriesStatus === "loading")
    return <div>Loading...</div>;
  if (status === "error" || categoriesStatus === "error")
    return <div>Something went wrong... please try again</div>;
  return (
    <Container maxWidth="xl" sx={{ p: { md: 8, sm: 4, xs: 2 } }}>
      <TasksHeader search={search} setSearch={setSearch} />
      <Grid container spacing={4}>
        <AnimateSharedLayout>
          {data
            ?.filter(
              (i) => i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
            .map((task, index) => (
              <Task
                key={task.id}
                task={task}
                handleExpand={() => handleExpand(index)}
                expanded={expandedTasks.includes(index)}
              />
            ))}
        </AnimateSharedLayout>
      </Grid>
      {data && data.length === 0 && (
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="column"
            p={4}
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "primary.main",
              borderRadius: "6px",
            }}
          >
            <Typography variant="h5" align="center">
              No Tasks added yet :(
            </Typography>
            <CTA />
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default Tasks;
