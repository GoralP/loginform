const initialState = {
  loading: false,
  deletepaste: null,
  error: false,
  message: null,
};

const deletePasteReducer = (state = initialState, action, id) => {
  switch (action.type) {
    case "DELETE_PASTE_PENDING":
      return { ...state, loading: true, deletepaste: null };
    case "DELETE_PASTE_SUCCESS":
      return {
        ...state,
        loading: false,
        deletepaste: action.deletepaste,
      };
    case "DELETE_PASTE_FAILURE":
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

export default deletePasteReducer;
