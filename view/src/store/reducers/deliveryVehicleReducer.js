import {
  CREATE_DELIVERY_VEHICLE_SUCCESS,
  CREATE_DELIVERY_VEHICLE_FAILURE,
  FETCH_DELIVERY_VEHICLES_SUCCESS,
  FETCH_DELIVERY_VEHICLES_FAILURE,
} from "../actions/deliveryVehicleActions";

const initialState = {
  deliveryVehicles: [],
  error: null,
};

const deliveryVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DELIVERY_VEHICLE_SUCCESS:
      return {
        ...state,
        deliveryVehicles: [...state.deliveryVehicles, action.payload],
        error: null,
      };
    case CREATE_DELIVERY_VEHICLE_FAILURE:
    case FETCH_DELIVERY_VEHICLES_FAILURE:
      return {
        ...state,
        error: action.payload?.response?.data?.message || "An error occurred.",
      };
    case FETCH_DELIVERY_VEHICLES_SUCCESS:
      return {
        ...state,
        deliveryVehicles: action.payload,
        error: null,
      };
    // Add cases for updating and deleting delivery vehicles
    default:
      return state;
  }
};

export default deliveryVehicleReducer;
