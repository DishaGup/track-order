import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  MARK_ORDER_DELIVERED_SUCCESS,
  MARK_ORDER_DELIVERED_FAILURE,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  ORDERS_REQUEST_PENDING,
  ORDERS_REQUEST_FAILURE,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS,
} from "../actions/orderActions";

const initialState = {
  orders: [],
  error: null,
  loading: false,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDERS_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, payload],
        error: null,
        loading: false,
      };
    case CREATE_ORDER_FAILURE:
    case MARK_ORDER_DELIVERED_FAILURE:
    case FETCH_ORDERS_FAILURE:
    case ORDERS_REQUEST_FAILURE:
      return {
        ...state,
        error: payload?.response?.data?.message || "An error occurred.",
        loading: false,
      };
    case MARK_ORDER_DELIVERED_SUCCESS:
      const updatedDeliveredOrders = state.orders.map((order) =>
        order._id === payload._id ? payload : order
      );
      return {
        ...state,
        orders: updatedDeliveredOrders,
        error: null,
        loading: false,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
        error: null,
        loading: false,
      };
    case UPDATE_ORDER_SUCCESS:
      const updatedOrders = state.orders.map((order) =>
        order._id === payload._id ? payload : order
      );
      return {
        ...state,
        orders: updatedOrders,
        error: null,
        loading: false,
      };
    case DELETE_ORDER_SUCCESS:
      const filteredOrders = state.orders.filter(
        (order) => order._id !== payload
      );
      return {
        ...state,
        orders: filteredOrders,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
