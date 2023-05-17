import i18next from "i18next";

export const getFirebaseErrorMessage = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return i18next.t("error.firebase.email.exist");
    case "auth/wrong-password":
    case "auth/invalid-email":
      return i18next.t("error.firebase.credentials.wrong");
    default:
      return i18next.t("error.general.unhandled");
  }
};
