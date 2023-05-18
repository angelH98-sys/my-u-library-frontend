import axios from "axios";
import { FirebaseAuth } from "../../config/firebase/firebase.config";
import { reduxStore } from "../../redux/store/store.redux";

const url = import.meta.env.VITE_BACKEND_API;

export const createBook = async () => {
  try {
    const token = await FirebaseAuth.currentUser?.getIdToken();

    const {
      book: { formData },
    } = reduxStore.getState();

    const { data } = await axios.post(`${url}/book`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (axiosError: any) {
    return axiosError.response.data;
  }
};

export const getBookById = async (id: any) => {
  try {
    const token = await FirebaseAuth.currentUser?.getIdToken();

    const { data } = await axios.get(`${url}/book/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (axiosError: any) {
    return axiosError.response.data;
  }
};

export const getPaginatedBooks = async (
  limit: any,
  skip: any,
  searchparam: any,
  searchtext: any
) => {
  try {
    const token = await FirebaseAuth.currentUser?.getIdToken();

    const { data } = await axios.get(
      `${url}/book?limit=${limit}&skip=${skip}&searchparam=${searchparam}&searchtext=${searchtext}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (axiosError: any) {
    return axiosError.response.data;
  }
};
