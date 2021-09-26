import {
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import { motion, Variants } from "framer-motion";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Box, styled } from "@mui/system";
import { TASK } from "../../../../interfaces/Task";

import useToggleTaskStatus from "../../../../hooks/useToggleTaskStatus";
import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";
import useDeleteTask from "../../../../hooks/useDeleteTask";
import { LoadingButton } from "@mui/lab";
import useGetCategories from "../../../../hooks/useGetCategories";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import useMoveTask from "../../../../hooks/useMoveTask";
import { useQueryClient } from "react-query";
import { formatTaskLabel } from "../../../../utils/taskUtils/formatTaskLabel";
import { getTaskStatusColor } from "../../../../utils/taskUtils/getTaskStatusColor";
interface IProps {
  task: TASK;
  handleExpand: () => void;
  expanded: boolean;
  index: number;
  setPreviewedTask: Dispatch<SetStateAction<TASK | null>>;
}

const TaskCard = ({
  task,
  handleExpand,
  expanded,
  index,
  setPreviewedTask,
}: IProps) => {
  const { mutateAsync } = useToggleTaskStatus();
  const ref = useRef<HTMLDivElement>(null);
  const handleToggleDone = async ({
    id,
    isDone,
  }: {
    id: string;
    isDone: boolean;
  }) => {
    try {
      await mutateAsync({ id, isDone });
    } catch (error) {}
  };

  const { data: categories } = useGetCategories();
  const { mutateAsync: deleteTask, isLoading } = useDeleteTask();
  const { mutateAsync: moveTaskMutation } = useMoveTask();
  const queryClient = useQueryClient();
  const formattedLabel = formatTaskLabel(task.isDone, task.deadline);
  const statusColor = getTaskStatusColor(formattedLabel);

  const moveCard = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      const dragCardId = queryClient.getQueryData<TASK[]>("tasks")?.[dragIndex]
        .id;
      if (dragCardId) {
        await moveTaskMutation({
          id: dragCardId,
          oldIndex: dragIndex,
          newIndex: hoverIndex,
        });
      }
    },
    [moveTaskMutation, queryClient]
  );
  const handleDeleteTask = async () => {
    try {
      await deleteTask({ id: task.id });
    } catch (error) {}
  };
  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: "task",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dropRef] = useDrop<{ id: string; index: number }, null, {}>({
    accept: "task",

    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index; // (DRAGGED INDEX/ITEM)
      const hoverIndex = index; // (DROP INDEX/ITEM)

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get hovered item middle height
      const hoveredItemVerticalCenter =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // console.log(hoverFirstQuarterY, "first");

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoveredItemVerticalCenter) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoveredItemVerticalCenter) {
        return;
      }

      // Time to actually perform the action

      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const childVariants = useMemo<Variants>(
    () => ({
      hidden: { y: 20, opacity: 0 },
      visible: {
        // y: isDragging ? -10 : 0,
        // opacity: isDragging ? 0.5 : 1,
        // rotate: isDragging ? "3 deg" : "0",
        opacity: 1,
        y: 0,
      },
      exit: {
        y: -50,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    }),
    []
  );
  dropRef(ref);
  return (
    <Grid ref={previewRef} xs={12} sm={6} lg={4} xl={3} item>
      <Card
        ref={ref}
        component={motion.div}
        variants={childVariants}
        exit="exit"
        initial="hidden"
        animate="visible"
        layout
        layoutId={task.id}
        elevation={4}
      >
        <CardContent sx={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb="0.5rem"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                variant="h5"
                fontWeight="medium"
                sx={{ textDecoration: task.isDone ? "line-through" : "none" }}
              >
                {task.title}
              </Typography>
              {task.subtasks.length > 0 && (
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: "secondary.main",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  {task.subtasks.length}
                </Avatar>
              )}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Checkbox
                color="secondary"
                checked={task.isDone}
                onChange={() =>
                  handleToggleDone({ id: task.id, isDone: !task.isDone })
                }
              />
              <IconButton ref={dragRef} sx={{ cursor: "grab" }}>
                <DragHandleIcon />
              </IconButton>
            </Stack>
          </Box>
          <TaskStatus color={statusColor} size="small" label={formattedLabel} />
          <Typography mb="1rem" color="text.secondary" variant="subtitle1">
            {task.description}
          </Typography>

          <Box
            display="flex"
            gap="0.5rem"
            alignItems="center"
            justifyContent="flex-end"
          >
            {task.categories.map((category) => (
              <Chip
                key={category}
                size="medium"
                sx={{
                  backgroundColor: categories?.find(
                    (cat) => cat?.id === category
                  )?.color,
                  color: "#fff",
                }}
                label={categories?.find((cat) => cat?.id === category)?.name}
              />
            ))}
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => setPreviewedTask(task)}
            sx={{ marginLeft: "auto" }}
          >
            Details
          </Button>
          <LoadingButton
            variant="contained"
            size="small"
            color="error"
            sx={{ marginLeft: "0.5rem" }}
            loading={isLoading}
            onClick={handleDeleteTask}
          >
            Delete
          </LoadingButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TaskCard;

const TaskStatus = styled(Chip)(({ theme }) => ({
  borderRadius: "6px",
  marginBottom: "1rem",
}));
