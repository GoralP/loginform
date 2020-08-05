const initialState = {
  loading: false,
  allpaste: null,
  error: false,
  message: null,
};

const getPasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PASTE_PENDING":
      return { ...state, loading: true, allpaste: null };
    case "GET_PASTE_SUCCESS":
      return {
        ...state,
        loading: false,
        allpaste: action.allpaste,
      };
    case "GET_PASTE_FAILURE":
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

export default getPasteReducer;
