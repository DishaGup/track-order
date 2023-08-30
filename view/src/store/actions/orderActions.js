import axios from "axios";
import { backend_url } from "../../App";

// Action types
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const MARK_ORDER_DELIVERED_SUCCESS = "MARK_ORDER_DELIVERED_SUCCESS";
export const MARK_ORDER_DELIVERED_FAILURE = "MARK_ORDER_DELIVERED_FAILURE";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";
export const ORDERS_REQUEST_PENDING = "ORDERS_REQUEST_PENDING";
export const ORDERS_REQUEST_FAILURE = "ORDERS_REQUEST_FAILURE";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";

// Action creators
export const createOrder = (orderData, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: token, // Include the token in the Authorization header
      },
    };
    const response = await axios.post(
      `${backend_url}/api/orders`,
      orderData,
      config
    );
    //console.log(response);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
    //console.log(error);
  }
};

export const markOrderDelivered = (orderId, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: token, // Include the token in the Authorization header
      },
    };
    const response = await axios.patch(
      `${backend_url}/api/orders/${orderId}/delivered`,
      null,
      config
    );
    //console.log(response);
    dispatch({ type: MARK_ORDER_DELIVERED_SUCCESS, payload: response.data });
  } catch (error) {
    //console.log(error);
    dispatch({ type: MARK_ORDER_DELIVERED_FAILURE, payload: error });
  }
};

export const fetchOrders = (token) => async (dispatch) => {
  dispatch({ type: ORDERS_REQUEST_PENDING });
  const config = {
    headers: {
      Authorization: token, // Include the token in the Authorization header
    },
  };
  try {
    const response = await axios.get(`${backend_url}/api/orders`, config);
    //console.log(response);
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    //console.log(error);
    dispatch({ type: FETCH_ORDERS_FAILURE, payload: error });
  }
};


export const updateOrder =
  (orderId, updatedData, token) => async (dispatch) => {
    dispatch({ type: ORDERS_REQUEST_PENDING });
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.put(
        `${backend_url}/api/orders/${orderId}`,
        updatedData,
        config
      );
      //console.log(response);
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
      //console.log(error);
      dispatch({ type: ORDERS_REQUEST_FAILURE, payload: error });
    }
  };

export const deleteOrder = (orderId, token) => async (dispatch) => {
  dispatch({ type: ORDERS_REQUEST_PENDING });
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios.delete(`${backend_url}/api/orders/${orderId}`, config);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    //console.log(error);
    dispatch({ type: ORDERS_REQUEST_FAILURE, payload: error });
  }
};
