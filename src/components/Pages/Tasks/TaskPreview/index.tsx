import { Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { Box, BoxProps, styled } from "@mui/system";
import { motion, MotionProps } from "framer-motion";
import { TASK } from "../../../../interfaces/Task";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Dispatch, SetStateAction } from "react";
import { formatTaskLabel } from "../../../../utils/taskUtils/formatTaskLabel";
import { getTaskStatusColor } from "../../../../utils/taskUtils/getTaskStatusColor";
import { useQueryClient } from "react-query";
import { CATEGORY } from "../../../../interfaces/Category";
import { format } from "date-fns";
interface IProps {
  task: TASK;
  setPreviewedTask: Dispatch<SetStateAction<TASK | null>>;
}

const TaskPreview = ({ task, setPreviewedTask }: IProps) => {
  const formattedLabel = formatTaskLabel(task.isDone, task.deadline);
  const statusColor = getTaskStatusColor(formattedLabel);
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<CATEGORY[]>("categories");
  return (
    <Container onClick={() => setPreviewedTask(null)}>
      <Card
        sx={{
          maxWidth: "md",
          width: "500px",

          zIndex: 1,
        }}
        component={motion.div}
        layoutId={task.id}
        elevation={24}
        layout
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CardContent sx={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography mb="0.5rem" variant="h4" fontWeight="medium">
              {task.title}
            </Typography>
            <IconButton onClick={() => setPreviewedTask(null)}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            my={2}
          >
            <Chip
              sx={{ borderRadius: "6px" }}
              color={statusColor}
              size="small"
              label={formattedLabel}
            />
            <Box>
              <Typography
                color="theme.pallete.success"
                variant="body2"
                textAlign="center"
              >
                Created at : {format(new Date(task.created_at), "dd-MM-yyyy")}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap="0.5rem" alignItems="center" my={2}>
            {formattedLabel === "In Progress" && (
              <Typography variant="body2" textAlign="center" color="error.main">
                Expires at : {format(new Date(task.deadline), "dd-MM-yyyy")}
              </Typography>
            )}
            <Box
              display="flex"
              gap="0.5rem"
              alignItems="center"
              justifyContent="flex-end"
              flex={1}
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
          </Box>
          <Typography
            mb="0.5rem"
            variant="h6"
            fontWeight="medium"
            color="secondary"
          >
            Description:
          </Typography>

          <Typography my="1rem" variant="subtitle1">
            {task.description}
          </Typography>

          {task.subtasks.length > 0 && (
            <Typography
              mb="0.5rem"
              variant="h6"
              fontWeight="medium"
              color="secondary"
            >
              Subtasks :
            </Typography>
          )}
          <Box component="ul" sx={{ paddingInlineStart: "30px" }}>
            {task.subtasks.map((subtask) => (
              <li key={subtask.name}>
                <Typography
                  sx={{
                    mb: { md: 2, sm: 2, xs: 4 },
                    ":last-child": {
                      mb: "0",
                    },
                  }}
                  variant="subtitle1"
                >
                  {subtask.name}
                </Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TaskPreview;

const Container = styled((props: BoxProps & MotionProps) => (
  <Box component={motion.div} {...props} />
))(({ theme }) => ({
  position: "fixed",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
  zIndex: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  // padding: "150px",
}));
