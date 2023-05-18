import { BookDetail } from "../../components/book/BookDetail";
import { BookForm } from "../../components/book/BookForm";
import { BookList } from "../../components/book/BookList";
import { getBookInBackend } from "../loader/book.loader";

export const BookRoutes = [
  {
    path: "book/create",
    element: <BookForm />,
  },
  {
    path: "book/list",
    element: <BookList />,
  },
  {
    path: "book/detail/:id",
    element: <BookDetail />,
    loader: getBookInBackend,
  },
];
