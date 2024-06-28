import axios from "axios";
const api = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
});

api.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0NjEiLCJlbWFpbCI6ImxpZXV0cmFuaGlldWhvYWlAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJuYmYiOjE3MTgzNzgyODEsImV4cCI6MTcxODk4MzA4MX0.DowmN6hQd66E_tUcW80UJFIOW4UjE_H-T3qf9cZR8gQ",
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MiIsIkhldEhhblN0cmluZyI6IjE3LzEwLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyOTEyMzIwMDAwMCIsIm5iZiI6MTcwMDE1NDAwMCwiZXhwIjoxNzI5MjcwODAwfQ.xKQVYYnO9233wkXRw5oU4Dtx41flqDuUnA0DbkDYRmM",
  };
  return config;
});

export default api;