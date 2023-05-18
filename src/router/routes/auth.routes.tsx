import { AuthLayout } from "../../components/auth/AuthLayout";
import { SignIn } from "../../components/auth/SignIn";
import { userAlreadyLogged } from "../loader/user.loader";

export const AuthRoutes = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    {
      path: "signin",
      element: <SignIn />,
      //loader: userAlreadyLogged,
    },
  ],
};
