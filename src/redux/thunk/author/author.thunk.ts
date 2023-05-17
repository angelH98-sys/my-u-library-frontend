import { getAllAuthors } from "../../../client/backend/author.client";
import { getBackendErrorMessages } from "../../../helper/backend.error.parser";
import {
  authorQueryFailed,
  authorQuerySucceed,
  executingAuthorQuery,
} from "../../slice/author/author.slice";

export const startGetAllAuthors = () => {
  return async (dispatch: any) => {
    dispatch(executingAuthorQuery({}));

    const { data, errors } = await getAllAuthors();

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(authorQueryFailed({ errors: errorMessages }))
      : dispatch(authorQuerySucceed({ records: data.records }));
  };
};
