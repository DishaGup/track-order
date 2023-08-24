import axios from "axios";
import { backend_url } from "../../App";

// Action types
export const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const ITEMS_REQUEST_PENDING = "ITEMS_REQUEST_PENDING";
export const ITEMS_REQUEST_FAILURE = "ITEMS_REQUEST_FAILURE";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";

// Action creators

export const createItem = (itemData, token) => async (dispatch) => {
  dispatch({ type: ITEMS_REQUEST_PENDING });
  const config = {
    headers: {
      Authorization: token, // Include the token in the Authorization header
    },
  };
  try {
    const response = await axios.post(
      `${backend_url}/api/items`,
      itemData,
      config
    );
    /// console.log(response)
    dispatch({ type: CREATE_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    //  console.log(error)
    dispatch({ type: ITEMS_REQUEST_FAILURE, payload: error.message });
  }
};

export const fetchItems = (token) => async (dispatch) => {
  dispatch({ type: ITEMS_REQUEST_PENDING });
  const config = {
    headers: {
      Authorization: token, // Include the token in the Authorization header
    },
  };
  try {
    const response = await axios.get(`${backend_url}/api/items`, config);
    // console.log(response)
    dispatch({ type: FETCH_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    //console.log(error)
    dispatch({ type: ITEMS_REQUEST_FAILURE, payload: error.message });
  }
};

export const updateItem = (itemId, updatedData, token) => async (dispatch) => {
  dispatch({ type: ITEMS_REQUEST_PENDING });
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${backend_url}/api/items/${itemId}`,
      updatedData,
      config
    );
    dispatch({ type: UPDATE_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ITEMS_REQUEST_FAILURE, payload: error.message });
  }
};

export const deleteItem = (itemId, token) => async (dispatch) => {
  dispatch({ type: ITEMS_REQUEST_PENDING });
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios.delete(`${backend_url}/api/items/${itemId}`, config);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({ type: ITEMS_REQUEST_FAILURE, payload: error.message });
  }
};
