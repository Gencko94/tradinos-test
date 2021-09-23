import { Button, Grid, InputAdornment, Paper, Typography } from "@mui/material";
import { Box, BoxProps, styled } from "@mui/system";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { SUBTASK } from "../../../../interfaces/Task";
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
  const { control, handleSubmit } = useForm<NEW_TASK>({
    defaultValues: { deadline: new Date() },
  });
  const { mutateAsync, isLoading } = useAddTask();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const onSubmit: SubmitHandler<NEW_TASK> = async (data) => {
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
    } catch (error) {}
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}

      // sx={{ display: "grid", gap: 2 }}
    >
      <Box component={Paper} p={4} elevation={4}>
        <Grid
          container
          spacing={4}
          // component={Paper}
          // sx={{ display: "grid", gap: 2 }}
        >
          <Grid md={6} xs={12} item>
            <Controller
              control={control}
              name="title"
              rules={{ required: "Required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Box mb={3}>
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
                </Box>
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{ required: "Required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Box mb={3}>
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
                </Box>
              )}
            />
            <Controller
              control={control}
              name="deadline"
              rules={{ required: "Required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Box mb={3}>
                  <Label>Task Deadline</Label>
                  <DatePicker
                    // defaultValue={new Date.now()}
                    disablePast
                    value={value}
                    onChange={(newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => <Input size="small" {...params} />}
                  />
                </Box>
              )}
            />
            <Controller
              control={control}
              name="categories"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Box mb={3}>
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
                </Box>
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                component="label"
                color="secondary"
                sx={{ display: "block", fontSize: { md: 18, xs: 15 } }}
                fontWeight="500"
              >
                Subtasks
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                endIcon={<ControlPointIcon />}
                onClick={() => append({ name: "" })}
              >
                Add new Subtask
              </Button>
            </Box>
            {fields.length === 0 && (
              <EmptyTable
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="secondary" variant="subtitle1">
                  No Subtasks added
                </Typography>
              </EmptyTable>
            )}
            <Box p={2}>
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
            </Box>
          </Grid>
        </Grid>
      </Box>
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

const EmptyTable = styled((props: BoxProps) => <Box {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "6px",
    padding: theme.spacing(2),
    minHeight: "200px",
  })
);
