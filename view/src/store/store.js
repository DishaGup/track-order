import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import customerReducer from "./reducers/customerReducer";
import deliveryVehicleReducer from "./reducers/deliveryVehicleReducer";
import authReducer from "./reducers/authReducer";
import itemReducer from "./reducers/itemReducer";
import orderReducer from "./reducers/orderReducer";

// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  customerReducer,
  orderReducer,
  authReducer,
  itemReducer,
  deliveryVehicleReducer,
});

// Create the Redux store with the rootReducer and apply middleware
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
