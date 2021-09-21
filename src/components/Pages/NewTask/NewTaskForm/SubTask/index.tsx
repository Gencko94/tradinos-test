import { IconButton } from "@mui/material";
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
        <div>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Label>Subtask #{parentIndex + 1}</Label>
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
        </div>
      )}
    />
  );
};

export default SubTask;
