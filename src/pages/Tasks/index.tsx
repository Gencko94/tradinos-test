import { Container, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import Task from "../../components/Pages/Tasks/Task";
import TasksHeader from "../../components/Pages/Tasks/TasksHeader";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Box } from "@mui/system";
import CTA from "../../components/Pages/Home/Hero/CTA";
import useGetTasks from "../../hooks/useGetTasks";
import useGetCategories from "../../hooks/useGetCategories";
import { TASK } from "../../interfaces/Task";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Tasks = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<TASK[]>([
    {
      id: "rPm",
      title: "Fake",
      description: "Fake Desciprion",
      deadline: "2021-09-21T13:16:47.248Z",
      created_at: "2021-09-21T13:16:58.022Z",
      categories: [1],
      subtasks: [
        {
          name: "dsads",
        },
      ],
      isDone: false,
    },
    {
      id: "yQE",
      title: "Learn Docker",
      description: "Learn docker in order to dockerize React applications",
      deadline: "2021-10-13T18:15:37.000Z",
      created_at: "2021-09-21T18:16:10.179Z",
      categories: [],
      subtasks: [
        {
          name: "Learn Devops",
        },
      ],
      isDone: false,
    },
    {
      id: "HiV",
      title: "ewq",
      description: "ewqeqw",
      deadline: "2021-09-24T18:11:56.433Z",
      created_at: "2021-09-24T18:11:58.135Z",
      categories: [],
      subtasks: [],
      isDone: false,
    },
    {
      id: "dHiV",
      title: "ewdsadq",
      description: "ewqeqw",
      deadline: "2021-09-24T18:11:56.433Z",
      created_at: "2021-09-24T18:11:58.135Z",
      categories: [],
      subtasks: [],
      isDone: false,
    },
  ]);
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
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = items[dragIndex];
      setItems(
        update(items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [items]
  );
  if (status === "loading" || categoriesStatus === "loading")
    return <div>Loading...</div>;
  if (status === "error" || categoriesStatus === "error")
    return <div>Something went wrong... please try again</div>;
  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="xl" sx={{ p: { md: 8, sm: 4, xs: 2 } }}>
        <TasksHeader search={search} setSearch={setSearch} />
        {items && items.length > 0 && (
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
                {items
                  .filter(
                    (i) =>
                      i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
                  )
                  .map((task, index) => (
                    <Task
                      key={task.id}
                      task={task}
                      handleExpand={() => handleExpand(index)}
                      expanded={expandedTasks.includes(index)}
                      index={index}
                      moveCard={moveCard}
                      setItems={setItems}
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
