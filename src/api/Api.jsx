import axios from "axios";

import { API_CONFIG } from "../config/ApiConfig";
import { getStorage } from "../utils/StorageUtils";

const createInstance = () => {
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  if (getStorage("token")) {
    headers["Authorization"] = `Bearer ${getStorage("token")}`;
  }

  const instance = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: 1000,
    headers,
  });

  return instance;
};

export const ApiPost = (url, data) => {
  try {
    return createInstance().post(url, data);
  } catch (e) {
    return false;
  }
};
export const ApiGet = (url, config = {}) => createInstance().get(url, config);
