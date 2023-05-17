import { createBrowserRouter } from "react-router-dom";
import { MyULibrary } from "../../components/MyULibrary";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { BookRoutes } from "./book.routes";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MyULibrary />,
    children: [AuthRoutes, ...UserRoutes, ...BookRoutes],
  },
]);
