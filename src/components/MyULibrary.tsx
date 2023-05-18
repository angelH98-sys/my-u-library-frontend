import { Outlet } from "react-router-dom";
import { Navbar } from "./ui/Navbar";
import { Toolbar } from "@mui/material";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../config/firebase/firebase.config";
import {
  authQuerySucceed,
  executingAuthQuery,
} from "../redux/slice/auth/auth.slice";
import { authQueryFailed } from "../redux/slice/auth/auth.slice";
import { getRoleFromLoggedUser } from "../client/backend/user.client";
import { useAppDispatch } from "../redux/store/store.redux";

export const MyULibrary = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(executingAuthQuery({}));
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        const {
          data: {
            records: [role],
          },
        } = await getRoleFromLoggedUser();

        return dispatch(
          authQuerySucceed({ records: { uid, email, displayName, role } })
        );
      }
      return dispatch(authQueryFailed({}));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Toolbar />
      <Outlet />
    </>
  );
};
