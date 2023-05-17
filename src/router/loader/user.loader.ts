import { redirect } from "react-router-dom";
import { reduxStore } from "../../redux/store/store.redux";
export const userLoggedIsLibrarian = () => {
  const {
    auth: { records },
  } = reduxStore.getState();

  return !!records && (records as any).role === "lib" ? true : redirect("/");
};
