/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import * as Config from "../config";

const api = axios.create({
  baseURL: Config.API_PUBLIC_URL,
  headers: { "Content-Type": "application/json" },
  /* other custom settings */
  validateStatus: () => true,
});

export default api;
