import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

export const Input = styled(TextField)<TextFieldProps>(({ theme }) => ({
  // @ts-ignore
  //   transition: theme.transitions?.create([
  //     "border-color",
  //     "background-color",
  //     "box-shadow",
  //   ]),
  "& .MuiOutlinedInput-root": {
    fieldset: {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.main,
    },
    // "&.Mui-focused fieldset": {
    //   borderColor: theme.palette.secondary.main,
    // },
  },
}));
