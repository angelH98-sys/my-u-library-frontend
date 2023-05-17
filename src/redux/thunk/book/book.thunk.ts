import { createBook } from "../../../client/backend/book.client";
import { getBackendErrorMessages } from "../../../helper/backend.error.parser";
import {
  bookQueryFailed,
  bookQuerySucceed,
  executingBookQuery,
} from "../../slice/book/book.slice";

export const startBookCreate = (formData: any) => {
  return async (dispatch: any) => {
    dispatch(executingBookQuery({ formData }));

    const { data, errors } = await createBook();

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(bookQueryFailed({ errors: errorMessages }))
      : dispatch(bookQuerySucceed({ records: data.records }));
  };
};
