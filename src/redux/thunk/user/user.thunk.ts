import {
  authQueryFailed,
  authQuerySucceed,
  executingAuthQuery,
} from "../../slice/auth/auth.slice";
import {
  signinToFirebase,
  signoutFromFirebase,
} from "../../../client/firebase/firebase.client";
import { getFirebaseErrorMessage } from "../../../helper/firebase.error.parser";
import { getRoleFromLoggedUser } from "../../../client/backend/user.client";

export const startSignIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(executingAuthQuery({ formData: undefined }));

    const { ok, uid, displayName, errorCode } = await signinToFirebase(
      email,
      password
    );

    let role = "";

    if (uid) {
      const { data } = await getRoleFromLoggedUser();
      data && (role = data.records[0]);
    }

    const errorMessage = errorCode ? getFirebaseErrorMessage(errorCode) : null;

    return ok
      ? dispatch(
          authQuerySucceed({ records: { uid, email, displayName, role } })
        )
      : dispatch(authQueryFailed({ errors: [errorMessage] }));
  };
};

export const logoutFromFirebase = () => {
  return async (dispatch: any) => {
    const response = await signoutFromFirebase();

    const errorMessage = !!response.errorCode
      ? getFirebaseErrorMessage(response.errorCode)
      : null;

    response.ok
      ? dispatch(authQueryFailed({}))
      : dispatch(authQueryFailed({ errors: [errorMessage] }));
  };
};
