import { BookDetail } from "../../components/book/BookDetail";
import { BookForm } from "../../components/book/BookForm";

export const BookRoutes = [
  {
    path: "book/create",
    element: <BookForm />,
  },
  {
    path: "book/detail/:id",
    element: <BookDetail />,
  },
];
