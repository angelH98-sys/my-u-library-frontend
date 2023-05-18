import { createBrowserRouter } from "react-router-dom";
import { MyULibrary } from "../../components/MyULibrary";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { BookRoutes } from "./book.routes";
import { CheckoutRoutes } from "./checkout.routes";
import { NotFound } from "../../components/ui/404";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MyULibrary />,
    errorElement: <NotFound />,
    children: [AuthRoutes, ...UserRoutes, ...BookRoutes, ...CheckoutRoutes],
  },
]);
