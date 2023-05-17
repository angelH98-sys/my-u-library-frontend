import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import { setBookInitialState } from "../../redux/slice/author/author.slice";
import { startBookCreate } from "../../redux/thunk/book/book.thunk";

export const BookForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setBookInitialState());
  }, []);

  const {
    errors: storeErrors,
    records,
    isExecutingRequest,
  } = useSelector((store: any) => store.book);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tittle: "",
      author: "",
      genre: "",
      stock: "",
      publishedYear: "",
    },
  });

  const onSubmit = (data: any) => {
    dispatch(startBookCreate(data));
  };

  return (
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
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
            }}
          >
            <BookmarkAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("ui.tittles.book.form")}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            label={t("form.label.book.tittle")}
            {...register("tittle", {
              required: {
                value: true,
                message: t("error.book.tittle.required"),
              },
            })}
            error={!!errors.tittle}
            helperText={!!errors.tittle ? errors.tittle.message : ""}
          />
          <TextField
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            label={t("form.label.book.author")}
            {...register("author", {
              required: {
                value: true,
                message: t("error.book.author.required"),
              },
            })}
            error={!!errors.author}
            helperText={!!errors.author ? errors.author.message : ""}
          />
          <TextField
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            label={t("form.label.book.genre")}
            {...register("genre", {
              required: {
                value: true,
                message: t("error.book.genre.required"),
              },
            })}
            error={!!errors.genre}
            helperText={!!errors.genre ? errors.genre.message : ""}
          />
          <TextField
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            label={t("form.label.book.stock")}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            {...register("stock", {
              required: {
                value: true,
                message: t("error.book.stock.required"),
              },
            })}
            error={!!errors.stock}
            helperText={!!errors.stock ? errors.stock.message : ""}
          />
          <TextField
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            label={t("form.label.book.publishedYear")}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            {...register("publishedYear", {
              required: {
                value: true,
                message: t("error.book.publishedYear.required"),
              },
            })}
            error={!!errors.publishedYear}
            helperText={
              !!errors.publishedYear ? errors.publishedYear.message : ""
            }
          />

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
              display={storeErrors === null ? "none" : ""}
              sx={{ mb: 2 }}
            >
              <Alert severity="error">
                {!!storeErrors &&
                  storeErrors.map((error: string) => `${error}\n`)}
              </Alert>
            </Grid>
            <Grid
              item
              display={Object.keys(errors).length == 0 ? "none" : ""}
              sx={{ mb: 2 }}
            >
              <Alert severity="error"></Alert>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit">
                {t("ui.button.create")}
              </Button>
            </Grid>
            <Grid item display={isExecutingRequest ? "" : "none"}>
              <LinearProgress />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
