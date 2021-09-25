import { Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import TasksHeader from "../../components/Pages/Tasks/TasksHeader";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Box } from "@mui/system";
import CTA from "../../components/Pages/Home/Hero/CTA";
import useGetTasks from "../../hooks/useGetTasks";
import useGetCategories from "../../hooks/useGetCategories";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCard from "../../components/Pages/Tasks/TaskCard";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="xl" sx={{ p: { md: 8, sm: 4, xs: 2 } }}>
        <TasksHeader search={search} setSearch={setSearch} />
        {data && data.length > 0 && (
          <AnimateSharedLayout>
            <Grid
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              container
              spacing={4}
            >
              <AnimatePresence>
                {data
                  .filter(
                    (i) =>
                      i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
                  )
                  .map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      handleExpand={() => handleExpand(index)}
                      expanded={expandedTasks.includes(index)}
                      index={index}
                    />
                  ))}
              </AnimatePresence>
            </Grid>
          </AnimateSharedLayout>
        )}
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
    </DndProvider>
  );
};

export default Tasks;
