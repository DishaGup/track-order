import axios from "axios";
import { backend_url } from "../../App";

// Action types
export const CREATE_DELIVERY_VEHICLE_SUCCESS =
  "CREATE_DELIVERY_VEHICLE_SUCCESS";
export const CREATE_DELIVERY_VEHICLE_FAILURE =
  "CREATE_DELIVERY_VEHICLE_FAILURE";
export const FETCH_DELIVERY_VEHICLES_SUCCESS =
  "FETCH_DELIVERY_VEHICLES_SUCCESS";
export const FETCH_DELIVERY_VEHICLES_FAILURE =
  "FETCH_DELIVERY_VEHICLES_FAILURE";

// Action creators
export const createDeliveryVehicle =
  (vehicleData, token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${backend_url}/api/delivery-vehicles`,
        vehicleData,
        config
      );
      //  console.log(response);
      dispatch({
        type: CREATE_DELIVERY_VEHICLE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      //  console.log(error);
      dispatch({ type: CREATE_DELIVERY_VEHICLE_FAILURE, payload: error });
    }
  };

export const fetchDeliveryVehicles = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${backend_url}/api/delivery-vehicles`,
      config
    );
    //  console.log(response);
    dispatch({ type: FETCH_DELIVERY_VEHICLES_SUCCESS, payload: response.data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: FETCH_DELIVERY_VEHICLES_FAILURE, payload: error });
  }
};
