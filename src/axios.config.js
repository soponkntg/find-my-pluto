import axios from "axios";
axios.defaults.baseURL = "https://orp7ck8zj8.execute-api.ap-southeast-1.amazonaws.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
export default axios;
