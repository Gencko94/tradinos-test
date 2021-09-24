import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  AccordionProps,
  AccordionSummaryProps,
  Button,
  Chip,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Checkbox,
} from "@mui/material";
import { AnimatePresence, motion, Variants } from "framer-motion";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, styled } from "@mui/system";
import { TASK } from "../../../../interfaces/Task";

import { format, isAfter, isBefore } from "date-fns";
import { CATEGORY } from "../../../../interfaces/Category";
import useToggleTaskStatus from "../../../../hooks/useToggleTaskStatus";
import { Link } from "react-router-dom";
import { useMemo, useRef } from "react";
import useDeleteTask from "../../../../hooks/useDeleteTask";
import { LoadingButton } from "@mui/lab";
import useGetCategories from "../../../../hooks/useGetCategories";
import { useDrag, useDrop, XYCoord } from "react-dnd";
interface IProps {
  task: TASK;
  handleExpand: () => void;
  expanded: boolean;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setItems: any;
}

const Task = ({
  task,
  handleExpand,
  expanded,
  index,
  moveCard,
  setItems,
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
  const formattedLabel = useMemo(() => {
    if (task.isDone) {
      return "Completed";
    } else if (isAfter(new Date(task.deadline), new Date())) {
      return "In Progress";
    } else {
      return "Expired";
    }
  }, [task.deadline, task.isDone]);

  const statusColor = useMemo(() => {
    if (formattedLabel === "Completed") {
      return "success";
    } else if (formattedLabel === "Expired") {
      return "error";
    } else {
      return "warning";
    }
  }, [formattedLabel]);
  const handleDeleteTask = async () => {
    try {
      await deleteTask({ id: task.id });
    } catch (error) {}
  };
  const [{ isDragging }, dragRef] = useDrag({
    type: "task",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
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

      // Get hovered item first quarter height
      const hoverFirstQuarterY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // console.log(hoverFirstQuarterY, "first");

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      const draggingDownwards = dragIndex < hoverIndex;
      const draggingUpwards = dragIndex > hoverIndex;

      // Dragging downwards
      // if (draggingDownwards && hoverClientY < hoveredItemVerticalCenter) {
      //   console.log("over the middle");
      //   moveCard(dragIndex, hoverIndex);
      //   item.index = hoverIndex;
      //   return;
      // }

      // // Dragging upwards
      // if (draggingUpwards && hoverClientY > hoveredItemVerticalCenter) {
      //   console.log("over the middle");
      //   moveCard(dragIndex, hoverIndex);
      //   item.index = hoverIndex;
      //   return;
      // }
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
        y: isDragging ? -10 : 0,
        opacity: isDragging ? 0.5 : 1,
        rotate: isDragging ? "3deg" : "0",
      },
      exit: {
        y: -50,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    }),
    [isDragging]
  );
  dropRef(dragRef(ref));
  return (
    <Grid
      component={motion.div}
      variants={childVariants}
      exit="exit"
      initial="hidden"
      animate="visible"
      layout
      xs={12}
      sm={6}
      md={6}
      lg={4}
      item
    >
      <Card ref={ref} component={Paper} elevation={4}>
        <CardContent sx={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              mb="0.5rem"
              variant="h6"
              sx={{ textDecoration: task.isDone ? "line-through" : "none" }}
            >
              {task.title}
            </Typography>
            <Checkbox
              color="secondary"
              checked={task.isDone}
              onChange={() =>
                handleToggleDone({ id: task.id, isDone: !task.isDone })
              }
            />
          </Box>
          <TaskStatus color={statusColor} size="small" label={formattedLabel} />
          <Typography
            mb="1rem"
            color="grey.700"
            fontWeight="light"
            variant="subtitle2"
          >
            {task.description}
          </Typography>
          {task.subtasks.length > 0 && (
            <CustomAccordion
              sx={{ mb: "1rem" }}
              expanded={expanded}
              onChange={() => task.subtasks.length > 0 && handleExpand()}
            >
              <CustomAccordionSummary
                hasChildren={task.subtasks.length > 0}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box flexGrow={1}>
                  <Typography
                    color="primary.light"
                    variant="subtitle2"
                    sx={{ mr: 2 }}
                  >
                    Subtasks ({task.subtasks.length}) :
                  </Typography>
                </Box>
              </CustomAccordionSummary>
              <CustomAccordionDetails>
                <ul style={{ margin: 0 }}>
                  {task.subtasks.map((subtask) => (
                    <li>
                      <Typography key={subtask.name}>{subtask.name}</Typography>
                    </li>
                  ))}
                </ul>
              </CustomAccordionDetails>
            </CustomAccordion>
          )}
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            {task.categories.map((category) => (
              <Chip
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
          {/* <Divider /> */}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            component={Link}
            color="info"
            to={`/task/${task.id}`}
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
            // onClick={handleDeleteTask}
            onClick={() =>
              setItems((prev: any) => prev.filter((t: any) => t.id !== task.id))
            }
          >
            Delete
          </LoadingButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Task;
const CustomAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "6px",
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
interface CustomAccordionProps extends AccordionSummaryProps {
  hasChildren: boolean;
}
const CustomAccordionSummary = styled((props: CustomAccordionProps) => (
  <AccordionSummary
    expandIcon={
      props.hasChildren ? (
        <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
      ) : null
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
}));
const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
const TaskStatus = styled(Chip)(({ theme }) => ({
  borderRadius: "6px",
  marginBottom: "1rem",
}));
