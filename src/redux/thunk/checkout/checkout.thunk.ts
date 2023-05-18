import {
  createCheckout,
  getAllCheckouts,
  updateCheckout,
} from "../../../client/backend/checkout.client";
import { getBackendErrorMessages } from "../../../helper/backend.error.parser";
import {
  checkoutQueryFailed,
  checkoutQuerySucceed,
  executingCheckoutQuery,
} from "../../slice/checkout/checkout.slice";

export const startCheckoutCreate = (book: any) => {
  return async (dispatch: any) => {
    dispatch(executingCheckoutQuery({ formData: { book } }));

    const { data, errors } = await createCheckout();

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(checkoutQueryFailed({ errors: errorMessages }))
      : dispatch(checkoutQuerySucceed({ records: data.records }));
  };
};

export const startGetAllCheckouts = (limit: any, skip: any, id?: any) => {
  return async (dispatch: any) => {
    dispatch(executingCheckoutQuery({}));

    const { data, errors } = await getAllCheckouts(limit, skip, id);

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(checkoutQueryFailed({ errors: errorMessages }))
      : dispatch(
          checkoutQuerySucceed({
            records: data.records,
            _metadata: data._metadata,
          })
        );
  };
};

export const startUpdateCheckout = (id: any) => {
  return async (dispatch: any) => {
    dispatch(executingCheckoutQuery({}));

    await updateCheckout(id);

    const { data, errors } = await getAllCheckouts(5, 0, "");

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(checkoutQueryFailed({ errors: errorMessages }))
      : dispatch(
          checkoutQuerySucceed({
            records: data.records,
          })
        );
  };
};
