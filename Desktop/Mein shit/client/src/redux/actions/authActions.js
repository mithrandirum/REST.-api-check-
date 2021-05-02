import api from "../../utils/api";
import { setAlert } from "./alertActions";
import {
  SET_ALERT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import { setToken } from "../../utils/setAuthToken";

//register user
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/register", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error, "danger"));
      });
    }
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const res = await api.get("/auth/users/me");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
