import axios from "axios";
const api = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
});

api.interceptors.request.use((config: any) => {
  const userLocal = localStorage.getItem("user");
  const currentUSer = userLocal ? JSON.parse(userLocal) : null;
  config.headers = {
    ...config.headers,
    token: currentUSer ? currentUSer.accessToken : "",
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDMiLCJIZXRIYW5TdHJpbmciOiIxNS8wMS8yMDI1IiwiSGV0SGFuVGltZSI6IjE3MzY4OTkyMDAwMDAiLCJuYmYiOjE3MTk0MjEyMDAsImV4cCI6MTczNzA0NjgwMH0._1nNTer6EQJycfH9UBD3WvpKecB92OKCg9GEyX6eSSc"
  };
  console.log(currentUSer);
  return config;
});

export default api;