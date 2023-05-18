import {
  bookQueryFailed,
  bookQuerySucceed,
  executingBookQuery,
} from "../../redux/slice/book/book.slice";
import { reduxStore } from "../../redux/store/store.redux";
import { getBookById } from "../../client/backend/book.client";
import { getBackendErrorMessages } from "../../helper/backend.error.parser";

export const getBookInBackend = async ({ params: { id } }) => {
  reduxStore.dispatch(executingBookQuery({}));

  const { data, errors } = await getBookById(id);

  const errorMessages = errors ? getBackendErrorMessages(errors) : "";

  return errors
    ? reduxStore.dispatch(bookQueryFailed({ errors: errorMessages }))
    : reduxStore.dispatch(bookQuerySucceed({ records: data.records }));
};
