import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8083";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8083",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    format: "json",
  },
});

instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");

    if (
      [403, 401].includes(error?.response?.status) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const res = await refreshExpiredToken(refreshToken);
      if (res?.status === 200) {
        var in15minutes = new Date(new Date().getTime() + 900000);
        Cookies.set("accessToken", res.data.accessToken, {
          expires: in15minutes,
        });
        localStorage.setItem("refreshToken", res.data.refreshToken);

        axios.defaults.headers.common["Authorization"] =
          "bearer " + res.data.accessToken;

        return axios(originalRequest);
      }
    }
    throw error;
  }
);

export const setAuthToken = (token) => {
  if (token && token != "no token") {
    //applying token
    instance.defaults.headers.common["Authorization"] = `bearer ${token}`;
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common["Authorization"];
  }
};

export const refreshExpiredToken = (refreshToken) => {
  return axios
    .post("/v1/user/token/", {
      refreshToken,
    })
    .then((responses) => {
      return responses;
    })
    .catch((errors) => {
      return errors.response;
    });
};

export default instance;
