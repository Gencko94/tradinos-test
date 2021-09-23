import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../Input";
import Label from "../../../Label";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { RegisterTypes } from "../../../../interfaces/RegisterTypes";
const RegisterForm = () => {
  const { handleSubmit, control } = useForm<RegisterTypes>();
  const onSubmit: SubmitHandler<RegisterTypes> = (data) => {};
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
          name="name"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Label>Name</Label>
              <Input
                fullWidth
                size="small"
                value={value}
                onChange={onChange}
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="secondary" />
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
                fullWidth
                size="small"
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
                type={showPassword ? "text" : "password"}
                fullWidth
                size="small"
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

export default RegisterForm;
