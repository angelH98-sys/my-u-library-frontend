import { useEffect } from "react";

import { Grid, Box, Avatar, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/book/list");
    }, 1500);
  }, []);

  return (
    <Grid container>
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
            <ErrorIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Oopss, it seems that this page does'nt exist.
            <br />
            Lets redirect to the content...
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
