import { Outlet } from "react-router-dom";
import { Navbar } from "./ui/Navbar";
import { Toolbar } from "@mui/material";

export const MyULibrary = () => {

  return(
    <>
      <Navbar/>
      <Toolbar/>
      <Outlet/>
    </>
  );
}