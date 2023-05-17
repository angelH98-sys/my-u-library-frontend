import { UserForm } from "../../components/user/UserForm";
import { UserList } from "../../components/user/UserList";
import { userLoggedIsLibrarian } from "../loader/user.loader";

export const UserRoutes = [
  {
    path: "user/create",
    element: <UserForm />,
    loader: userLoggedIsLibrarian,
  },
  {
    path: "user/list",
    element: <UserList />,
  },
];
