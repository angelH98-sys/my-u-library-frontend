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
import {
  createUser,
  getPaginatedUsers,
  getRoleFromLoggedUser,
} from "../../../client/backend/user.client";
import {
  executingUserQuery,
  userQueryFailed,
  userQuerySucceed,
} from "../../slice/user/user.slice";
import { getBackendErrorMessages } from "../../../helper/backend.error.parser";

export const startUserCreation = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}) => {
  return async (dispatch: any) => {
    dispatch(executingUserQuery({ formData }));

    const { data, errors } = await createUser();

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(userQueryFailed({ errors: errorMessages }))
      : dispatch(userQuerySucceed({ records: data.records }));
  };
};

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

export const startGetPaginatedUsers = (limit: any, skip: any) => {
  return async (dispatch: any) => {
    dispatch(executingUserQuery({}));

    const { data, errors } = await getPaginatedUsers(limit, skip);

    const errorMessages = errors ? getBackendErrorMessages(errors) : "";

    errors
      ? dispatch(userQueryFailed({ errors: errorMessages }))
      : dispatch(
          userQuerySucceed({ records: data.records, _metadata: data._metadata })
        );
  };
};
