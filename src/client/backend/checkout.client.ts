import axios from "axios";
import { FirebaseAuth } from "../../config/firebase/firebase.config";
import { reduxStore } from "../../redux/store/store.redux";

const url = import.meta.env.VITE_BACKEND_API;

export const createCheckout = async () => {
  try {
    const token = await FirebaseAuth.currentUser?.getIdToken();

    const {
      checkout: { formData },
    } = reduxStore.getState();

    const { data } = await axios.post(`${url}/checkout`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (axiosError: any) {
    return axiosError.response.data;
  }
};
