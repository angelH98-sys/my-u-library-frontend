import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseAuth } from "../../config/firebase/firebase.config";

export const signinToFirebase = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, displayName } = response.user;

    return { ok: true, uid, email, displayName };
  } catch (error: any) {
    return {
      ok: false,
      errorCode: error.code,
    };
  }
};

export const signoutFromFirebase = async () => {
  try {
    await signOut(FirebaseAuth);
    return { ok: true };
  } catch (error: any) {
    return {
      ok: false,
      errorCode: error.code,
    };
  }
};
