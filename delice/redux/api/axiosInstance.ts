import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: "http://172.21.48.92:3000/api",
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  console.log("Attaching token to request:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
