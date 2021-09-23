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
import { motion } from "framer-motion";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, styled } from "@mui/system";
import { TASK } from "../../../../interfaces/Task";

import { format, isAfter, isBefore } from "date-fns";
import { useQueryClient } from "react-query";
import { CATEGORY } from "../../../../interfaces/Category";
import useToggleTaskStatus from "../../../../hooks/useToggleTaskStatus";
import { Link } from "react-router-dom";
import { useMemo } from "react";
interface IProps {
  task: TASK;
  handleExpand: () => void;
  expanded: boolean;
}

const Task = ({ task, handleExpand, expanded }: IProps) => {
  const { mutateAsync } = useToggleTaskStatus();
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
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<CATEGORY[]>("categories");
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
  return (
    <Grid component={motion.div} layout xs={12} sm={6} md={6} lg={4} item>
      <Card component={Paper} elevation={4}>
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
        <CardActions disableSpacing>
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
