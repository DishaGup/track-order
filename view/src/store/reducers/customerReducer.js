import {
  CREATE_CUSTOMER_SUCCESS,
  FETCH_CUSTOMERS_SUCCESS,
  CUSTOMER_REQUEST_FAILURE,
  CUSTOMER_REQUEST_PENDING,
  DELETE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_SUCCESS,
  // Add other action types
} from "../actions/customerActions";

const initialState = {
  customers: [],
  error: null,
  loading: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        loading: false,
        error: null,
      };

    case CUSTOMER_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      const updatedCustomers = state.customers.map((customer) =>
        customer._id === action.payload._id ? action.payload : customer
      );
      return {
        ...state,
        customers: updatedCustomers,
        error: null,
        loading: false,
      };
    case DELETE_CUSTOMER_SUCCESS:
      const filteredCustomers = state.customers.filter(
        (customer) => customer._id !== action.payload
      );
      return {
        ...state,
        customers: filteredCustomers,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default customerReducer;
