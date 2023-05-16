import { AuthLayout } from "../../components/auth/AuthLayout";
import { SignIn } from "../../components/auth/SignIn";

export const AuthRoutes = {
  path: "auth",
  element: <AuthLayout/>,
  children: [
    {
      path: "signin",
      element: <SignIn/>,
    }
  ]
}