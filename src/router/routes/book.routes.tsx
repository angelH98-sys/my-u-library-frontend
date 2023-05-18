import { BookDetail } from "../../components/book/BookDetail";
import { BookForm } from "../../components/book/BookForm";
import { BookList } from "../../components/book/BookList";
import { isUserLogged, isUserLoggedAndLibrarian } from "../loader/user.loader";

export const BookRoutes = [
  {
    path: "book/create",
    element: <BookForm />,
    //loader: isUserLoggedAndLibrarian,
  },
  {
    path: "book/list",
    element: <BookList />,
    //loader: isUserLogged,
  },
  {
    path: "book/detail/:id",
    element: <BookDetail />,
    //loader: isUserLogged,
  },
];
