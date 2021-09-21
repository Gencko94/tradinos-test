import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, Paper } from "@mui/material";
import { alpha, Box, styled } from "@mui/system";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginTypes } from "../../../../interfaces/LoginTypes";
import { Input } from "../../../Input";
import Label from "../../../Label";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginTypes>();
  const onSubmit: SubmitHandler<LoginTypes> = (data) => {
    console.log(data);
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Paper elevation={4} sx={{ p: 4 }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "grid", gap: 2 }}
      >
        <Controller
          control={control}
          name="email"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Label>Email Address</Label>
              <Input
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
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
        <Controller
          control={control}
          name="password"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Label>Password</Label>
              <Input
                size="small"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon color="secondary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          type="submit"
          size="large"
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
