import axios from "axios";
import { FirebaseAuth } from "../../config/firebase/firebase.config";

const url = import.meta.env.VITE_BACKEND_API;

export const getRoleFromLoggedUser = async () => {
  try {
    const token = await FirebaseAuth.currentUser?.getIdToken();

    const { data } = await axios.get(`${url}/user/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
