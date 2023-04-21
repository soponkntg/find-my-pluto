import axios from "axios";
const PlutoAxios = axios.create({
  baseURL: "https://orp7ck8zj8.execute-api.ap-southeast-1.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});
export default PlutoAxios;
