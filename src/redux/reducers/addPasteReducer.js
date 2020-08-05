const initialState = {
  loading: false,
  paste: null,
  error: false,
  message: null,
};

const addPasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PASTE_PENDING":
      return { ...state, loading: true, paste: null };
    case "ADD_PASTE_SUCCESS":
      return {
        ...state,
        loading: false,
        paste: action.paste,
      };
    case "ADD_PASTE_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    default:
      return { ...state };
  }
};

export default addPasteReducer;
