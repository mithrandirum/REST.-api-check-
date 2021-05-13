import axios from "axios";
import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
} from "./types";

import { setAlert } from "./alertActions";

export const addPost = (file, text, e) => async (dispatch) => {
  //   const config = {
  //     "Content-Type": "application/json",
  //   };

  e.preventDefault();

  var bodyFormData = new FormData();

  bodyFormData.append("file", file);
  bodyFormData.append("text", text);

  try {
    const res = await axios.post("http://localhost:5000/post", bodyFormData);

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: res.data,
    });

    console.log(res.data);

    //   dispatch({
    //     type: GET_PROFILE,
    //     payload: res.data,
    //   });

    //   //dispatch(getProfile());

    //   dispatch(setAlert("Profile Created", "success"));

    //   history.push("./profile");

    //   console.log(res.data);
  } catch (err) {
    console.log(err);

    dispatch({
      type: CREATE_POST_FAIL,
    });
    //   dispatch({
    //     type: PROFILE_ERROR,
    //   });

    //   dispatch(setAlert(error.response.data.errors[0], "danger"));
  }
};

//get post by id

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/post/post/${postId}`);

    dispatch({
      type: GET_POST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_POST_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/post/posts");

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_POSTS_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

//get user posts

export const getUsertPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/post/user-posts");

    dispatch({
      type: GET_USER_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_USER_POSTS_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

//add comment by post Id

export const addComment = (comment, postId) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
    const res = await axios.put(
      `http://localhost:5000/post/add-comment/${postId}`,
      { comment },
      config
    );

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: ADD_COMMENT_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};
