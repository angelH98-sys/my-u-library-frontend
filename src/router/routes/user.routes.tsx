import { UserForm } from "../../components/user/UserForm";
import { UserList } from "../../components/user/UserList";
import { isUserLoggedAndLibrarian } from "../loader/user.loader";

export const UserRoutes = [
  {
    path: "user/create",
    element: <UserForm />,
    //loader: isUserLoggedAndLibrarian,
  },
  {
    path: "user/list",
    element: <UserList />,
    //loader: isUserLoggedAndLibrarian,
  },
];
