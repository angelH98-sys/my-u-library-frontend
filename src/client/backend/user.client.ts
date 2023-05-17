import axios from "axios";
import { FirebaseAuth } from "../../config/firebase/firebase.config";
import { reduxStore } from "../../redux/store/store.redux";

const url = import.meta.env.VITE_BACKEND_API;

export const createUser = async () => {
  try {
    const token = await FirebaseAuth.currentUser?.getIdToken();

    const {
      user: { formData },
    } = reduxStore.getState();

    const { data } = await axios.post(`${url}/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (axiosError: any) {
    return axiosError.response.data;
  }
};

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
    return error;
  }
};

export const getPaginatedUsers = async (limit: any, skip: any) => {
  try {
    const token = await FirebaseAuth.currentUser?.getIdToken();

    const { data } = await axios.get(
      `${url}/user?limit=${limit}&skip=${skip}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};
