import { redirect } from "react-router-dom";
import { reduxStore } from "../../redux/store/store.redux";
import { FirebaseAuth } from "../../config/firebase/firebase.config";
import { getRoleFromLoggedUser } from "../../client/backend/user.client";
import { authQuerySucceed } from "../../redux/slice/auth/auth.slice";

export const isUserLogged = () => {
  const {
    auth: { records },
  } = reduxStore.getState();

  if (!!records && (records as any).status === "authenticated") {
    return;
  }

  return redirect("/auth/signin");
};

export const userAlreadyLogged = () => {
  console.log("llego");
  const {
    auth: { records },
  } = reduxStore.getState();

  if (!!records && (records as any).status === "authenticated") {
    return redirect("/book/list");
  }

  return redirect("/auth/signin");
};

export const isUserLoggedAndLibrarian = () => {
  const {
    auth: { records },
  } = reduxStore.getState();

  if (
    !!records &&
    (records as any).status === "authenticated" &&
    (records as any).role === "lib"
  ) {
    return;
  }

  return redirect("/auth/signin");
};
