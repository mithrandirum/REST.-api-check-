import api from "../../utils/api";
import { setAlert } from "./alertActions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";
import { setToken } from "../../utils/setAuthToken";
import store from "../../store";
import axios from "axios";

//register user
export const register = (formData, history) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(
      "http://localhost:5000/auth/register",
      formData,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());

    history.push("/profile");
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

//log in user

export const login = (formData, history) => async (dispatch) => {
  const config = { "Content-Type": "application/json" };

  try {
    const res = await axios.post(
      "http://localhost:5000/auth/login",
      formData,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    //history.push("/profile");

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });

    const errors = err.response.data;
    console.log(errors);
    if (errors.length > 0) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
};

// if theres is a token set to the loca storage we wanna set it to the header of the every request
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/auth/users/me");
    console.log(res);
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

export const logout = (history) => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  history.push("/");

  const state = store.getState();
  if (state.authReducer.user !== null) {
    dispatch({
      LOGOUT_FAIL,
    });
  }
};
