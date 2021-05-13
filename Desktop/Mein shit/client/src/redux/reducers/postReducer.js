import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  GET_POST_FAIL,
  GET_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
} from "./../actions/types";

const intial = {
  post: {},
  posts: [],
  userPosts: null,
  loading: true,
};

const postReducer = (state = intial, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,

        loading: false,
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        posts: null,
        loading: false,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        ...payload,
        posts: [...state.posts, payload],
        loading: false,
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
      };

    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };
    case GET_USER_POSTS_FAIL:
      return {
        ...state,
        userPosts: null,
        loading: false,
      };

    case GET_POST_SUCCESS:
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case GET_POSTS_FAIL:
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        post: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
