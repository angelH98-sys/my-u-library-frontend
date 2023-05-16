import { createBrowserRouter } from "react-router-dom";
import { MyULibrary } from "../../components/MyULibrary";
import { AuthRoutes } from "./auth.routes";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MyULibrary/>,
    children: [AuthRoutes],
  }
]);