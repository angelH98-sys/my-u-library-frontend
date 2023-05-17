import { createBrowserRouter } from "react-router-dom";
import { MyULibrary } from "../../components/MyULibrary";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MyULibrary/>,
    children: [AuthRoutes, ...UserRoutes],
  }
]);