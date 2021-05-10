import { setAlert } from "./alertActions";
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  Empty_PROFILE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
} from "./types";
import { setToken } from "../../utils/setAuthToken";
import store from "../../store";
import axios from "axios";
import { getProfile } from "./profileActions";

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

    history.push("/create-profile");
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });

    console.log(err);
    console.log(err.response.data);

    dispatch(setAlert(err.response.data, "danger"));
  }
};

//log in user

export const login = (formData, history) => async (dispatch) => {
  const config = { "Content-Type": "application/json" };

  // const profileId =
  //   store.getState().profileReducer.profile._id !== null &&
  //   store.getState().profileReducer.profile._id;
  // const profileState = store.getState().profileReducer;

  try {
    const res = await axios.post(
      "http://localhost:5000/auth/login",
      formData,
      config
    );
    dispatch(getProfile());

    if (res.data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert("successfully login attemps", "success"));

      setTimeout(() => history.push(`/profile`), 2000);
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch(setAlert(err.response.data, "danger"));

    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
  }
};

// if theres is a token set to the loca storage we wanna set it to the header of the every request
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/auth/users/me");
    console.log(res.data);
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
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  history.push("/");

  dispatch({
    type: Empty_PROFILE,
  });

  const state = store.getState();
  if (state.authReducer.user !== null) {
    dispatch({
      LOGOUT_FAIL,
    });
  }
};

export const updateUser = (data, history) => async (dispatch) => {
  const config = { "Content-Type": "application/json" };

  const res = await axios.put(
    `http://localhost:5000/auth/users/update`,
    data,
    config
  );

  try {
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("user credentials updated", "success"));

    setTimeout(() => history.push("/profile"), 1000);
  } catch (err) {
    dispatch(setAlert(err.response.data[0], "danger"));
    console.log(err.response.data);
    dispatch({
      USER_UPDATE_FAILED,
    });
  }
};
