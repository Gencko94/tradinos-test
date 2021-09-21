import { Button, Container, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { SUBTASK, TASK } from "../../../../interfaces/Task";
import Label from "../../../Label";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import { Input } from "../../../Input";
import { DatePicker, LoadingButton } from "@mui/lab";
import Select from "react-select";
// import { categories } from "../../../../data/categories";
import SubTask from "./SubTask";
import useAddTask from "../../../../hooks/useAddTask";
import { CATEGORY } from "../../../../interfaces/Category";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import useGetCategories from "../../../../hooks/useGetCategories";
export type NEW_TASK = {
  title: string;
  description: string;
  deadline: Date;
  created_at: Date;
  categories: CATEGORY[];
  subtasks: SUBTASK[];
  isDone: boolean;
};
export type NEW_TASK_REQUEST = {
  title: string;
  description: string;
  deadline: Date;
  created_at: Date;
  categories: number[];
  subtasks: SUBTASK[];
  isDone: boolean;
};
const NewTaskForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NEW_TASK>({ defaultValues: { deadline: new Date() } });
  const { mutateAsync, isLoading } = useAddTask();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const onSubmit: SubmitHandler<NEW_TASK> = async (data) => {
    console.log({
      ...data,
      categories:
        data.categories?.length > 0
          ? data.categories?.map((category: any) => category.id)
          : [],
      isDone: false,
      created_at: new Date(),
    });
    try {
      await mutateAsync({
        ...data,
        categories:
          data.categories?.length > 0
            ? data.categories?.map((category: any) => category.id)
            : [],
        isDone: false,
        created_at: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "grid", gap: 2 }}
    >
      <Controller
        control={control}
        name="title"
        rules={{ required: "Required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <Label>Task Title</Label>
            <Input
              fullWidth
              value={value}
              onChange={onChange}
              error={!!error}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubtitlesIcon color="secondary" />
                  </InputAdornment>
                ),
              }}
              helperText={error ? error.message : null}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="description"
        rules={{ required: "Required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <Label>Task description</Label>
            <Input
              multiline
              rows={4}
              fullWidth
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="deadline"
        rules={{ required: "Required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <Label>Task Deadline</Label>
            <DatePicker
              // defaultValue={new Date.now()}
              disablePast
              value={value}
              onChange={(newValue) => {
                console.log(newValue);
                onChange(newValue);
              }}
              renderInput={(params) => <Input size="small" {...params} />}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="categories"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <Label>Categories</Label>
            <Select
              isLoading={categoriesLoading}
              isMulti
              value={value}
              options={categories}
              menuPortalTarget={document.body}
              onChange={onChange}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id.toString()}
              menuShouldScrollIntoView={false}
            />
          </div>
        )}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="secondary" variant="h6">
          Subtasks
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          endIcon={<ControlPointIcon />}
          onClick={() => append({})}
        >
          Add new Subtask
        </Button>
      </Box>
      {fields.map((field, index) => {
        return (
          <SubTask
            remove={remove}
            key={field.id}
            parentIndex={index}
            control={control}
          />
        );
      })}

      <LoadingButton
        loading={isLoading}
        fullWidth
        type="submit"
        size="large"
        variant="contained"
        sx={{ mt: 4 }}
      >
        Create New Task
      </LoadingButton>
    </Box>
  );
};

export default NewTaskForm;
