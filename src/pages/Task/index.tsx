import { Container, Typography, Button, Chip, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Hr from "../../components/Hr";
import useGetCategories from "../../hooks/useGetCategories";
import { useGetTask } from "../../hooks/useGetTask";
import useToggleTaskStatus from "../../hooks/useToggleTaskStatus";
import { TASK } from "../../interfaces/Task";

const Task = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data, status } = useGetTask(id);
  const { data: categories, status: categoriesStatus } = useGetCategories();
  const { mutateAsync } = useToggleTaskStatus();
  const handleToggleDone = async ({ isDone }: { isDone: boolean }) => {
    try {
      await mutateAsync({ id: data?.id, isDone });
      queryClient.setQueryData<TASK | undefined>(
        ["task", id],
        // @ts-ignore
        (prev: TASK | undefined) => {
          if (typeof prev !== "undefined") {
            return {
              ...prev,
              isDone,
            };
          }
        }
      );
    } catch (error) {}
  };
  if (status === "loading" || categoriesStatus === "loading")
    return <div>Loading...</div>;
  return (
    <Container maxWidth="xl" sx={{ p: { md: 8, sm: 4, xs: 2 } }}>
      <Box
        alignItems="center"
        justifyContent="space-between"
        display="flex"
        flexWrap="wrap"
        gap={2}
      >
        <Typography
          sx={{ fontSize: { md: 60, xs: 40 } }}
          textAlign="center"
          variant="h2"
          color="primary"
        >
          Task : {data?.title}
        </Typography>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexWrap="wrap"
          gap={1}
          // flexDirection="column"
        >
          <Typography
            color="primary.light"
            variant="subtitle1"
            textAlign="center"
            sx={{ mr: 2 }}
          >
            Created at :{/* @ts-ignore */}
            {format(new Date(data?.created_at), "dd-MM-yyyy")}
          </Typography>
          <Button
            variant={data?.isDone ? "contained" : "outlined"}
            size="small"
            color={data?.isDone ? "success" : "primary"}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleDone({ isDone: !data?.isDone });
            }}
          >
            {data?.isDone ? "Done" : "Mark as done"}
          </Button>
        </Box>
      </Box>
      <Hr />
      <Box component={Paper} p={4}>
        <Box
          alignItems="center"
          justifyContent="space-between"
          display="flex"
          flexWrap="wrap"
          gap={1}
          mb={2}
        >
          <Box alignItems="center" justifyContent="center" display="flex">
            <Typography color="info" variant="button" textAlign="end">
              Task Categories :{" "}
              {data?.categories.length === 0 && "No Categories Set"}
            </Typography>
            {data?.categories.map((category) => (
              <Chip
                size="medium"
                sx={{
                  ml: 1,
                  backgroundColor: categories?.find(
                    (cat) => cat?.id === category
                  )?.color,
                  color: "#fff",
                }}
                label={categories?.find((cat) => cat?.id === category)?.name}
              />
            ))}
          </Box>
          <Typography color="error" variant="subtitle1" textAlign="end">
            Task Deadine :{/* @ts-ignore */}
            {format(new Date(data?.deadline), "dd-MM-yyyy", new Date())}
          </Typography>
        </Box>
        <Typography
          sx={{ mb: { md: 2, sm: 2, xs: 4 } }}
          variant="h5"
          color="secondary"
        >
          Task description :
        </Typography>
        <Box
          p={2}
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "primary.main",
            borderRadius: "6px",
          }}
        >
          <Typography variant="body1">{data?.description}</Typography>
        </Box>
        <Hr />
        <Typography
          sx={{ mb: { md: 2, sm: 2, xs: 4 } }}
          variant="h5"
          color="secondary"
        >
          Subtasks :
        </Typography>
        {data?.subtasks.length === 0 && (
          <Box
            p={2}
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "primary.main",
              borderRadius: "6px",
            }}
          >
            <Typography variant="body1">No Subtasks were added</Typography>
          </Box>
        )}
        <ul>
          {data?.subtasks.map((subtask) => (
            <li key={subtask.name}>
              <Typography sx={{ mb: { md: 2, sm: 2, xs: 4 } }} variant="h6">
                {subtask.name}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default Task;
