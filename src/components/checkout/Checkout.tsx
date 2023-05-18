import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
  Alert,
  Avatar,
  Box,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { useParams } from "react-router-dom";
import { setCheckoutDefaultValues } from "../../redux/slice/checkout/checkout.slice";
import {
  startGetAllCheckouts,
  startUpdateCheckout,
} from "../../redux/thunk/checkout/checkout.thunk";
import { useAppDispatch } from "../../redux/store/store.redux";

export const Checkout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { records, _metadata, isExecutingRequest } = useSelector(
    (store: any) => store.checkout
  );
  const { records: authRecord } = useSelector((store: any) => store.auth);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(setCheckoutDefaultValues());
    dispatch(startGetAllCheckouts(rowsPerPage, page * rowsPerPage, id));
  }, []);

  useEffect(() => {
    dispatch(startGetAllCheckouts(rowsPerPage, page * rowsPerPage, id));
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

  const onUpdateClick = async (id: any) => {
    if (!!authRecord && authRecord.role === "lib") {
      await dispatch(startUpdateCheckout(id));
      setPage(0);
    }
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
            <ReceiptIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("ui.tittles.checkout")}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Alert
          severity="info"
          sx={{
            maxWidth: "300px",
            m: "0 auto",
            display: !!authRecord && authRecord.role === "lib" ? "" : "none",
          }}
        >
          {t("ui.text.checkout.checkinInfo")}
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
                  {t("ui.tables.checkout.book")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.checkout.student")}
                </TableCell>
                <TableCell component="th">
                  {t("ui.tables.checkout.checkoutAt")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!records ? (
                records.map((r: any) => {
                  return (
                    <TableRow
                      key={r._id}
                      onClick={(event) => onUpdateClick(r._id)}
                    >
                      <TableCell component="td">{r.book}</TableCell>
                      <TableCell component="td">{r.student}</TableCell>
                      <TableCell component="td">
                        {new Date(r.checkoutAt).toLocaleString()}
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
