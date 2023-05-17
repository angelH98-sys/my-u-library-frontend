import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

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
  Avatar,
  LinearProgress,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { startGetPaginatedUsers } from "../../redux/thunk/user/user.thunk";

export const UserList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { records, _metadata, isExecutingRequest } = useSelector(
    (store: any) => store.user
  );

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(startGetPaginatedUsers(rowsPerPage, page * rowsPerPage));
  }, []);

  useEffect(() => {
    dispatch(startGetPaginatedUsers(rowsPerPage, page * rowsPerPage));
  }, [rowsPerPage, page]);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
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
            <FormatListBulletedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("ui.tittles.user.list")}
          </Typography>
        </Box>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <TableContainer
          sx={{ maxHeight: "100vh", maxWidth: "700px", margin: "0 auto" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell component="th">{t("ui.tables.user.id")}</TableCell>
                <TableCell component="th">
                  {t("ui.tables.user.firstName")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.user.lastName")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.user.email")}
                </TableCell>
                <TableCell component="th">{t("ui.tables.user.role")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!records ? (
                records.map((r: any) => {
                  return (
                    <TableRow key={r._id}>
                      <TableCell component="td">{r._id}</TableCell>
                      <TableCell component="td">{r.firstName}</TableCell>
                      <TableCell component="td">{r.lastName}</TableCell>
                      <TableCell component="td">{r.email}</TableCell>
                      <TableCell component="td">
                        {t(`form.label.user.${r.role}`)}
                      </TableCell>
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
