import { Card, CardContent, Grid, Paper, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const BookDetail = () => {
  const { t } = useTranslation();
  const { records } = useSelector((store: any) => store.book);

  return (
    <Grid
      container
      sx={{ mt: 2 }}
      spacing={2}
      justifyContent="center"
      maxWidth="1200px"
      m="0 auto"
    >
      <Grid item xs={12} sm={12} md={4}>
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
                {records[0].tittle}
              </Typography>
              <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
                {records[0].author}
              </Typography>
              <Typography component="h1" variant="subtitle1" sx={{ mt: 2 }}>
                {records[0].genre}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={4} mt={6}>
        <Box component="div">
          <Typography variant="h6" fontStyle="italic">
            {t("ui.text.book.tittle")}
          </Typography>
          <Typography variant="h5" ml={5}>
            {records[0].tittle}
          </Typography>
          <Typography variant="h6" fontStyle="italic">
            {t("ui.text.book.author")}
          </Typography>
          <Typography variant="h5" ml={5}>
            {records[0].author}
          </Typography>
          <Typography variant="h6" fontStyle="italic">
            {t("ui.text.book.genre")}
          </Typography>
          <Typography variant="h5" ml={5}>
            {records[0].genre}
          </Typography>
          <Typography variant="h6" fontStyle="italic">
            {t("ui.text.book.stock")}
          </Typography>
          <Typography variant="h5" ml={5}>
            {records[0].stock}
          </Typography>
          <Typography variant="h6" fontStyle="italic">
            {t("ui.text.book.publishedYear")}
          </Typography>
          <Typography variant="h5" ml={5}>
            {records[0].publishedYear}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
