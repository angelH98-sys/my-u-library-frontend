import { UserForm } from "../../components/user/UserForm";
import { UserList } from "../../components/user/UserList";

export const UserRoutes = [
  {
    path: "user/create",
    element: <UserForm />,
  },
  {
    path: "user/list",
    element: <UserList />,
  },
];
