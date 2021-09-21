import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  AccordionProps,
  AccordionSummaryProps,
  Button,
  Chip,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, styled } from "@mui/system";
import { TASK } from "../../../../interfaces/Task";

import { format } from "date-fns";
import { useQueryClient } from "react-query";
import { CATEGORY } from "../../../../interfaces/Category";
import useToggleTaskStatus from "../../../../hooks/useToggleTaskStatus";
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
    id: number;
    isDone: boolean;
  }) => {
    try {
      await mutateAsync({ id, isDone });
    } catch (error) {}
  };
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<CATEGORY[]>("categories");
  return (
    <CustomAccordion
      expanded={expanded}
      onChange={() => task.subtasks.length > 0 && handleExpand()}
    >
      <CustomAccordionSummary
        hasChildren={task.subtasks.length > 0}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box flexGrow={1}>
          <Box display="flex" justifyContent="" alignItems="center">
            <Typography
              sx={{ textDecoration: task.isDone ? "line-through" : "none" }}
            >
              {task.title}
            </Typography>
          </Box>
          <Typography color="primary.light" variant="caption" sx={{ mr: 2 }}>
            {/* Created at :{format(task.created_at, "dd-MM-yyyy")} */}
            Created at :{/* @ts-ignore */}
            {format(new Date(task.created_at), "dd-MM-yyyy", new Date())}
          </Typography>
          {task.categories.map((category) => (
            <Chip
              size="small"
              sx={{
                mr: 3,
                backgroundColor: categories?.find((cat) => cat?.id === category)
                  ?.color,
                color: "#fff",
              }}
              label={categories?.find((cat) => cat?.id === category)?.name}
            />
          ))}
        </Box>
        <Button
          variant={task.isDone ? "contained" : "outlined"}
          size="small"
          color={task.isDone ? "success" : "primary"}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleDone({ id: task.id, isDone: !task.isDone });
          }}
        >
          {task.isDone ? "Done" : "Mark as done"}
        </Button>
      </CustomAccordionSummary>
      <CustomAccordionDetails>
        <Typography sx={{ color: "secondary.main" }}>SubTasks :</Typography>
        {task.subtasks.map((subtask) => (
          <Typography key={subtask.name}>{subtask.name}</Typography>
        ))}
      </CustomAccordionDetails>
    </CustomAccordion>
  );
};

export default Task;
const CustomAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
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
  },
}));
const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
