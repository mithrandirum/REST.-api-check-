import {
  PROFILE_LOADED,
  PROFILE_ERROR,
  AUTH_ERROR,
  USER_LOADED,
  IMAGE_UPLOADED,
  UPLOAD_FAILED,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  Empty_PROFILE,
  GET_PROFILE,
} from "./types";
import axios from "axios";
import { setAlert } from "./alertActions";
import { loadUser } from "./authActions";
import store from "../../store";

export const createProfile = (profileData, history) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/profile/create",
      profileData,
      config
    );

    // history()
    // dispatch(loadUser());

    console.log(res);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    //dispatch(getProfile());

    dispatch(setAlert("Profile Created", "success"));

    //setTimeout(() => history.push("profile"), 2000);

    history.push("profile");
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
    });

    // dispatch(setAlert(error.response.data.errors[0], "danger"));
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/profile/me");

    if (store.getState().authReducer.isAuthenticated) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    }
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const uploadImage = (file) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/profile/image/:profileId",
      file,
      config
    );

    dispatch({
      type: IMAGE_UPLOADED,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: UPLOAD_FAILED,
    });

    if (error.response.data.errors)
      dispatch(setAlert(error.response.data.errors[0], "danger"));
  }
};

//update profile

export const updateProfile = (formData) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
    const res = await axios.put(
      "http://localhost:5000/profile/update",
      formData,
      config
    );

    dispatch({
      type: Empty_PROFILE,
    });

    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch(getProfile());
  } catch (error) {
    // dispatch({
    //   type: UPLOAD_FAILED,
    // });
    // if (error.response.data.errors)
    //   dispatch(setAlert(error.response.data.errors[0]));
  }
};
