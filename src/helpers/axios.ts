import axios from "axios";

const appAxios = axios.create({
  baseURL: "http://localhost:5000",
});

export default appAxios;
