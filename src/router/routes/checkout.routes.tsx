import { Checkout } from "../../components/checkout/Checkout";

export const CheckoutRoutes = [
  {
    path: "checkout/:id",
    element: <Checkout />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
];
