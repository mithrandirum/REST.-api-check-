import api from "./api";

export const setToken = (token) => {
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;

    //req.headers.authorization.startsWith("Bearer")
  } else {
    delete api.headers.authorization.token;
  }
};
