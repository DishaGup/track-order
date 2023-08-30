import {
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILURE,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ITEMS_REQUEST_PENDING,
  ITEMS_REQUEST_FAILURE,
  DELETE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
} from "../actions/itemActions";

const initialState = {
  items: [],
  error: null,
  loading: false,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_REQUEST_PENDING:
      // Set loading to true when a user request is pending
      return {
        ...state,
        loading: true,
      };
    case CREATE_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        error: null,
        loading: false,
      };
    case ITEMS_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_ITEM_SUCCESS:
      const updatedItems = state.items.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      return {
        ...state,
        items: updatedItems,
        error: null,
        loading: false,
      };
    case DELETE_ITEM_SUCCESS:
      const filteredItems = state.items.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        items: filteredItems,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default itemReducer;
