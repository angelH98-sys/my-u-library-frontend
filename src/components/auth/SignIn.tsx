import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { startSignIn } from "../../redux/thunk/user/user.thunk";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { status, errors: storeErrors } = useSelector(
    (state: any) => state.auth
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    await dispatch(startSignIn(email, password));
  };

  useEffect(() => {
    status == "authenticated" && navigate("/");
  }, [status]);

  return (
    <Grid item xs={12} sm={8} md={5}>
      <Box
        sx={{
          my: 2,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
          }}
        >
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("ui.tittles.auth.signin")}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label={t("form.label.signin.email")}
            autoComplete="email"
            {...register("email")}
          />
          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel error={!!errors.password}>
              {t("form.label.signin.password")}
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              autoComplete="password"
              label={t("form.label.signin.password")}
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="button" onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid
            container
            direction="column"
            sx={{ mt: 3, mb: 2, position: "relative" }}
          >
            <Grid
              item
              display={storeErrors === null ? "none" : ""}
              sx={{ mb: 2 }}
            >
              <Alert severity="error">{storeErrors}</Alert>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                disabled={status === "checking"}
                type="submit"
              >
                {t("ui.button.signin")}
              </Button>
            </Grid>
            <Grid item display={status === "checking" ? "" : "none"}>
              <LinearProgress />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
