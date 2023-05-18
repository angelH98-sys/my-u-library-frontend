import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { startGetBookById } from "../../redux/thunk/book/book.thunk";
import { setBookDefaultValues } from "../../redux/slice/book/book.slice";
import { startCheckoutCreate } from "../../redux/thunk/checkout/checkout.thunk";
import { setCheckoutDefaultValues } from "../../redux/slice/checkout/checkout.slice";
import { useAppDispatch } from "../../redux/store/store.redux";

export const BookDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    records,
    isExecutingRequest: isExecutingBookRequest,
    errors: bookErrors,
  } = useSelector((store: any) => store.book);
  const { records: authRecords } = useSelector((store: any) => store.auth);
  const {
    isExecutingRequest: isExecutingCheckoutRequest,
    records: checkoutRecords,
  } = useSelector((store: any) => store.checkout);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (!id) {
      return navigate("/book/list");
    }
    dispatch(setCheckoutDefaultValues());
    dispatch(setBookDefaultValues());
    dispatch(startGetBookById(id));
    setInitial(false);
  }, []);

  useEffect(() => {
    if (bookErrors) {
      navigate("/book/list");
    }
  }, [bookErrors]);

  useEffect(() => {
    if (checkoutRecords && !initial) {
      navigate(`/checkout/${authRecords.uid}`);
    }
  }, [checkoutRecords]);

  const onCheckoutCreate = (_event: any) => {
    dispatch(startCheckoutCreate(records[0]._id));
  };

  return (
    <Grid
      container
      sx={{ mt: 2 }}
      justifyContent="center"
      maxWidth="1200px"
      m="0 auto"
    >
      <Grid
        item
        display={isExecutingBookRequest ? "" : "none"}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h5">{t("ui.tittles.book.gettingBook")}</Typography>
        <LinearProgress />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        display={isExecutingBookRequest ? "none" : ""}
      >
        <Paper
          sx={{
            maxWidth: {
              xs: "300px",
              sm: "300px",
              md: "300px",
              lg: "300px",
              xl: "300px",
            },
            m: "0 auto",
          }}
          elevation={3}
        >
          <Card
            sx={{
              backgroundColor: "#E0C9A6",
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                mt: 15,
                mb: 15,
              }}
            >
              <Typography component="h1" variant="h4">
                {!!records && records[0].tittle}
              </Typography>
              <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
                {!!records && records[0].author}
              </Typography>
              <Typography component="h1" variant="subtitle1" sx={{ mt: 2 }}>
                {!!records && records[0].genre}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        display={isExecutingBookRequest ? "none" : ""}
      >
        <Typography variant="h6" fontStyle="italic">
          {t("ui.text.book.tittle")}
        </Typography>
        <Typography variant="h5">{!!records && records[0].tittle}</Typography>
        <Typography variant="h6" fontStyle="italic">
          {t("ui.text.book.author")}
        </Typography>
        <Typography variant="h5">{!!records && records[0].author}</Typography>
        <Typography variant="h6" fontStyle="italic">
          {t("ui.text.book.genre")}
        </Typography>
        <Typography variant="h5">{!!records && records[0].genre}</Typography>
        <Typography variant="h6" fontStyle="italic">
          {t("ui.text.book.stock")}
        </Typography>
        <Typography variant="h5">{!!records && records[0].stock}</Typography>
        <Typography variant="h6" fontStyle="italic">
          {t("ui.text.book.publishedYear")}
        </Typography>
        <Typography variant="h5">
          {!!records && records[0].publishedYear}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          disabled={
            (!!records && records[0].stock > 0) || isExecutingCheckoutRequest
              ? false
              : true
          }
          sx={{
            display: !!authRecords && authRecords.role == "lib" ? "none" : "",
          }}
          onClick={onCheckoutCreate}
        >
          {!!records && records[0].stock > 0
            ? t("ui.button.checkout.addBook")
            : t("ui.button.checkout.outOfStock")}
        </Button>
        <LinearProgress
          sx={{
            display: isExecutingCheckoutRequest ? "" : "none",
          }}
        />
      </Grid>
    </Grid>
  );
};
