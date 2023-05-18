import { Checkout } from "../../components/checkout/Checkout";
import { isUserLogged } from "../loader/user.loader";

export const CheckoutRoutes = [
  {
    path: "checkout/:id",
    element: <Checkout />,
    //loader: isUserLogged,
  },
  {
    path: "checkout",
    element: <Checkout />,
    //loader: isUserLogged,
  },
];
