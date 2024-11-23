import axios from "axios";
import { BASE_URL } from "./constant";

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export const callAPI = async (resource) => {
  const { data } = await axios.get(`${BASE_URL}/${resource}`, config);
  console.log(data);
  return data;
};