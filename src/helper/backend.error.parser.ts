import i18next from "i18next";

export const getBackendErrorMessages = (errors: Object[]) => {
  return errors.map((errorCode: any) => i18next.t(errorCode.message));
};
