import axios from "axios";
import { BASE_API_URL } from "./constants";

export default axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});