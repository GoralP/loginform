const initialState = {
  loading: false,
  editpaste: null,
  error: false,
  message: null,
};

const editPasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PASTE_PENDING":
      return { ...state, loading: true, editpaste: null };
    case "EDIT_PASTE_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "EDIT_PASTE_FAILURE":
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

export default editPasteReducer;
