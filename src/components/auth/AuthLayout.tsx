import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Image from "../../assets/library.jpg";

export const AuthLayout = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh"}}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "",
        }}
      />
      <Outlet />
    </Grid>
  );
}