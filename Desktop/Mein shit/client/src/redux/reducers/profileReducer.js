import {
  PROFILE_LOADED,
  // PROFILE_ERROR,
  IMAGE_UPLOADED,
  UPLOAD_FAILED,
  Empty_PROFILE,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
  GET_PROFILE,
} from "./../actions/types";

const initialState = {
  profile: null,
  loading: true,
  profiles: null,
  errors: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADED:
    case IMAGE_UPLOADED:
    case UPDATE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    // case PROFILE_ERROR:
    case Empty_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case UPLOAD_FAILED:
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default profileReducer;
