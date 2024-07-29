import axios from "axios";

export const app = axios.create({
  baseURL: "https://kenziehub.herokuapp.com",
  timeout: 10 * 1000,
})