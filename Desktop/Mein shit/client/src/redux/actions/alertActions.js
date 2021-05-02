import { SET_ALERT, REMOVE_ALERT } from "./types";

import { uuid } from "uuidv4";

export const setAlert = (msg, alertype, timeout = 4000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertype, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
