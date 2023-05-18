import { createCheckout } from "../../../client/backend/checkout.client";
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
