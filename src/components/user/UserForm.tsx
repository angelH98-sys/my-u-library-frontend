import { Alert, Avatar, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";

const rolesAvailable: String[] = (import.meta.env.VITE_USER_ROLES).split(",");

export const UserForm = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const { 
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    }
  });

  const onRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
    setValue("role", role);
  }

  const onSubmit = () => {

  }

  return(
    <Grid container justifyContent="center">
      <Grid item sx={{ my: 2, mx: 3 }}>
        <Box 
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
          >
            <Avatar sx={{
              m: 1,
              bgcolor: "primary.main",
            }}>
              <PersonAddAltIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("ui.tittles.user.form")}
            </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="text"
              fullWidth
              sx={{ mb: 3 }}
              label={t("form.label.user.firstName")}
              {...register("firstName", {
                required: {
                  value: true,
                  message: t("error.user.firstName.required"),
                },
              })}
              error={!!errors.firstName}
              helperText={!!errors.firstName ? errors.firstName.message : ""}
            />
            <TextField
              type="text"
              fullWidth
              sx={{ mb: 3 }}
              label={t("form.label.user.lastName")}
              {...register("lastName", {
                required: {
                  value: true,
                  message: t("error.user.lastName.required"),
                },
              })}
              error={!!errors.lastName}
              helperText={!!errors.lastName ? errors.lastName.message : ""}
            />
            <TextField
              type="text"
              fullWidth
              sx={{ mb: 3 }}
              label={t("form.label.user.email")}
              {...register("email", {
                required: {
                  value: true,
                  message: t("error.user.email.required"),
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: t("error.user.email.format"),
                },
              })}
              error={!!errors.email}
              helperText={!!errors.email ? errors.email.message : ""}
            />
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel>{t("form.label.user.role")}</InputLabel>
              <Select
                value={role}
                label={t("form.label.user.role")}
                {...register("role", {
                  required: {
                    value: true,
                    message: t("error.user.role.required"),
                  },
                  onChange(event) {
                    onRoleChange(event)
                  },
                })}
              >
                {
                  rolesAvailable.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)
                }
              </Select>
              <FormHelperText>{!!errors.role ? errors.role.message : ""}</FormHelperText>
            </FormControl>
            <Grid
              container
              direction="column"
              sx={{
                mt: 3,
                mb: 2,
                position: "relative",
              }}
            >
              <Grid
                item
                display={Object.keys(errors).length == 0 ? "none" : ""}
                sx={{ mb: 2 }}
              >
                <Alert severity="error">
                </Alert>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {t("ui.button.create")}
                </Button>
              </Grid>
            </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};