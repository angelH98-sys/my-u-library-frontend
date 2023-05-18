import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
  Grid,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  InputLabel,
  Select,
  Avatar,
  LinearProgress,
  FormControl,
  MenuItem,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { startGetPaginatedBooks } from "../../redux/thunk/book/book.thunk";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setBookDefaultValues } from "../../redux/slice/book/book.slice";
import { useAppDispatch } from "../../redux/store/store.redux";

export const BookList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { records, _metadata, isExecutingRequest } = useSelector(
    (store: any) => store.book
  );

  const { register, setValue, getValues, handleSubmit } = useForm({
    defaultValues: { searchParam: "tittle", searchText: "" },
  });

  const [searchParam, setSearchParam] = useState("tittle");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(setBookDefaultValues());
    dispatch(
      startGetPaginatedBooks(
        rowsPerPage,
        page * rowsPerPage,
        getValues().searchParam,
        getValues().searchText
      )
    );
  }, []);

  useEffect(() => {
    dispatch(
      startGetPaginatedBooks(
        rowsPerPage,
        page * rowsPerPage,
        getValues().searchParam,
        getValues().searchText
      )
    );
  }, [rowsPerPage, page]);

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchParamChange = (event: any) => {
    setSearchParam(event.target.value as string);
    setValue("searchParam", searchParam);
  };

  const onSubmit = (_data: any) => {
    setPage(0);
    dispatch(
      startGetPaginatedBooks(
        rowsPerPage,
        page * rowsPerPage,
        getValues().searchParam,
        getValues().searchText
      )
    );
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      sx={{ mt: 1 }}
    >
      <Grid item>
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
            <AutoStoriesIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("ui.tittles.book.list")}
          </Typography>
        </Box>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <Box
          component="form"
          sx={{ maxWidth: "700px", margin: "0 auto" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>{t("form.label.book.search.param")}</InputLabel>
                <Select
                  value={searchParam}
                  label={t("form.label.book.search.param")}
                  {...register("searchParam", {
                    onChange(event) {
                      handleSearchParamChange(event);
                    },
                  })}
                >
                  <MenuItem value="tittle">Tittle</MenuItem>
                  <MenuItem value="author">Author</MenuItem>
                  <MenuItem value="genre">Genre</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                fullWidth
                sx={{ mb: 3 }}
                label={t("form.label.book.search.text")}
                {...register("searchText")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{ height: { sm: "69%" } }}
              >
                {t("ui.button.search")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Alert severity="info" sx={{ maxWidth: "300px", m: "0 auto" }}>
          {t("ui.text.book.bookInfo")}
        </Alert>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <TableContainer
          sx={{ maxHeight: "100vh", maxWidth: "700px", margin: "0 auto" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell component="th">
                  {t("ui.tables.book.tittle")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.book.author")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.book.genre")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.book.stock")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.book.publishedYear")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!records ? (
                records.map((r: any) => {
                  return (
                    <TableRow
                      key={r._id}
                      onClick={(_event: any) =>
                        navigate(`/book/detail/${r._id}`)
                      }
                    >
                      <TableCell component="td">{r.tittle}</TableCell>
                      <TableCell component="td">{r.author}</TableCell>
                      <TableCell component="td">{r.genre}</TableCell>
                      <TableCell component="td">{r.stock}</TableCell>
                      <TableCell component="td">{r.publishedYear}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    {isExecutingRequest ? (
                      <LinearProgress />
                    ) : (
                      t("ui.tables.general.noRecords")
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={5}
                  count={!!_metadata ? _metadata.total_count : "0"}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
