import axios from "axios";
import { backend_url } from "../../App";

export const CREATE_CUSTOMER_SUCCESS = "CREATE_CUSTOMER_SUCCESS";
export const FETCH_CUSTOMERS_SUCCESS = "FETCH_CUSTOMERS_SUCCESS";
export const CUSTOMER_REQUEST_PENDING = "CUSTOMER_REQUEST_PENDING";
export const CUSTOMER_REQUEST_FAILURE = "CUSTOMER_REQUEST_FAILURE";
export const UPDATE_CUSTOMER_SUCCESS = "UPDATE_CUSTOMER_SUCCESS";
export const DELETE_CUSTOMER_SUCCESS = "DELETE_CUSTOMER_SUCCESS";
// Action creators
export const createCustomer = (customerData, token) => async (dispatch) => {
  dispatch({ type: CUSTOMER_REQUEST_PENDING });
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.post(
      `${backend_url}/api/customers`,
      customerData,
      config
    );
    //console.log(response);
    dispatch({ type: CREATE_CUSTOMER_SUCCESS, payload: response.data });
  } catch (error) {
    //console.log(error);
    dispatch({ type: CUSTOMER_REQUEST_FAILURE, payload: error.message });
  }
};

export const fetchCustomers = (token) => async (dispatch) => {
  dispatch({ type: CUSTOMER_REQUEST_PENDING });
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.get(`${backend_url}/api/customers`, config);
    //console.log(response);
    dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: response.data });
  } catch (error) {
    //console.log(error);
    dispatch({ type: CUSTOMER_REQUEST_FAILURE, payload: error.message });
  }
};

export const updateCustomer =
  (customerId, updatedData, token) => async (dispatch) => {
    dispatch({ type: CUSTOMER_REQUEST_PENDING });
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.put(
        `${backend_url}/api/customers/${customerId}`,
        updatedData,
        config
      );
      //console.log(response);
      dispatch({ type: UPDATE_CUSTOMER_SUCCESS, payload: response.data });
    } catch (error) {
      //console.log(error);
      dispatch({ type: CUSTOMER_REQUEST_FAILURE, payload: error.message });
    }
  };

export const deleteCustomer = (customerId, token) => async (dispatch) => {
  dispatch({ type: CUSTOMER_REQUEST_PENDING });
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios.delete(`${backend_url}/api/customers/${customerId}`, config);
    dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: customerId });
  } catch (error) {
    // console.log(error);
    dispatch({ type: CUSTOMER_REQUEST_FAILURE, payload: error.message });
  }
};
