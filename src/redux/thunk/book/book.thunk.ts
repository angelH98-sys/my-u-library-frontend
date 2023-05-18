import {
  createBook,
  getBookById,
  getPaginatedBooks,
} from "../../../client/backend/book.client";
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

export const startGetBookById = (id: any) => {
  return async (dispatch: any) => {
    dispatch(executingBookQuery({}));

    const { data, errors } = await getBookById(id);

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(bookQueryFailed({ errors: errorMessages }))
      : dispatch(bookQuerySucceed({ records: data.records }));
  };
};

export const startGetPaginatedBooks = (
  limit: any,
  skip: any,
  searchparam: any,
  searchtext: any
) => {
  return async (dispatch: any) => {
    dispatch(executingBookQuery({}));

    const { data, errors } = await getPaginatedBooks(
      limit,
      skip,
      searchparam,
      searchtext
    );

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(bookQueryFailed({ errors: errorMessages }))
      : dispatch(
          bookQuerySucceed({ records: data.records, _metadata: data._metadata })
        );
  };
};
