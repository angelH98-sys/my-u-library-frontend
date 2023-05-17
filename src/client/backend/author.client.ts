import axios from "axios";

const url = import.meta.env.VITE_BACKEND_API;

export const getAllAuthors = async () => {
  try {
    const { data } = await axios.get(`${url}/author`);
  } catch (axiosError: any) {
    return axiosError.response.data;
  }
};
