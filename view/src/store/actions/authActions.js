import { backend_url } from "../../App";
import axios from "axios";

// Action types
export const USER_GET_REQUEST_PENDING = "USER_GET_REQUEST_PENDING";
export const USER_LOGIN_REQUEST_SUCCESS = "USER_LOGIN_REQUEST_SUCCESS";
export const USER_REGISTER_REQUEST_SUCCESS = "USER_REGISTER_REQUEST_SUCCESS";
export const USER_GET_REQUEST_FAILURE = "USER_GET_REQUEST_FAILURE";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const loginRequest = (data) => async (dispatch) => {
  dispatch({ type: USER_GET_REQUEST_PENDING }); // Dispatch a user request pending action

  try {
    // Make a POST request to the login endpoint
    const res = await axios.post(`${backend_url}/api/users/login`, data);
    dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: res.data }); // Dispatch a user login request success action
    //console.log(res)
  } catch (error) {
    //console.log(error)
    dispatch({ type: USER_GET_REQUEST_FAILURE, payload: error }); // Dispatch a user request failure action
  }
};

// Register a new user
export const registerRequest = (data) => async (dispatch) => {
  dispatch({ type: USER_GET_REQUEST_PENDING }); // Dispatch a user request pending action

  try {
    const res = await axios.post(`${backend_url}/api/users/register`, data);
    //console.log(res)

    dispatch({ type: USER_REGISTER_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    //console.log(error);
    dispatch({ type: USER_GET_REQUEST_FAILURE, payload: error }); // Dispatch a user request failure action
  }
};
