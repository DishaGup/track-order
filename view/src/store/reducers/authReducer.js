import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_GET_REQUEST_PENDING,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_GET_REQUEST_FAILURE,
  USER_LOGOUT_SUCCESS,
} from "../actions/authActions";

const initial = {
  loading: false,
  error: null,
  token: null,
  userId: null,
};

const authReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case USER_GET_REQUEST_PENDING:
      // Set loading to true when a user request is pending
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_REQUEST_SUCCESS:
      // Update user details and token on successful user login request
      return {
        ...state,
        loading: false,
        token: payload.token,
        userId: payload.userId,
        error: null,
      };

    case USER_REGISTER_REQUEST_SUCCESS:
      // Update bookmarked data on successful user data request
      return {
        ...state,
        loading: false,
        token: payload.token,
        userId: payload.userId,
        error: null,
      };

    case USER_LOGOUT_SUCCESS:
      // Reset user details and token on successful user logout
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
      };

    case USER_GET_REQUEST_FAILURE:
      // Update error message on user request failure
      return {
        ...state,
        loading: false,
        error: payload?.response?.data?.message || "An error occurred.",
      };

    default:
      return state;
  }
};
export default authReducer;
