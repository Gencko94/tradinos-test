import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Control, Controller } from "react-hook-form";
import { Input } from "../../../../Input";
import Label from "../../../../Label";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { NEW_TASK } from "..";
interface IProps {
  control: Control<NEW_TASK, object>;
  parentIndex: number;
  remove: (index?: number | number[] | undefined) => void;
}

const SubTask = ({ control, parentIndex, remove }: IProps) => {
  return (
    <Controller
      control={control}
      name={`subtasks.${parentIndex}.name`}
      // rules={{ required: "Required" }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <Label>Subtask #{parentIndex + 1}</Label> */}
            <Typography
              component="label"
              color="primary"
              sx={{ display: "block", mb: 1.5, fontSize: { md: 15, xs: 12 } }}
              fontWeight="500"
            >
              Subtask #{parentIndex + 1}
            </Typography>
            <IconButton size="small" onClick={() => remove(parentIndex)}>
              <HighlightOffIcon color="error" />
            </IconButton>
          </Box>
          <Input
            size="small"
            fullWidth
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );
};

export default SubTask;
