const initialState = {
  loading: false,
  posts: null,
  error: "",
  message: "",
  addpaste: { loading: false, paste: null, message: null },
  getpaste: { loading: false, allpaste: null, message: null },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_FETCH_PENDING":
      return { ...state, loading: true, posts: null };
    case "LOGIN_FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.posts,
        error: "",
        message: action.message,
      };
    case "LOGIN_FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        posts: action.posts,
        error: "",
        message: action.message,
      };
    case "ADDPASTE_PENDING":
      return { ...state, addpaste: { loading: true, paste: null } };
    case "ADDPASTE_SUCCESS":
      return { ...state, addpaste: { loading: false, paste: action.paste } };
    case "ADDPASTE_FAILURE":
      return {
        ...state,
        addpaste: { loading: false, message: action.message },
      };
    case "GETPASTE_PENDING":
      return { ...state, getpaste: { loading: true, allpaste: null } };
    case "GETPASTE_SUCCESS":
      return {
        ...state,
        getpaste: { loading: false, allpaste: action.allpaste },
      };
    case "GETPASTE_FAILURE":
      return {
        ...state,
        getpaste: { loading: false, message: action.message },
      };
    default:
      return { ...state };
  }
};

export default loginReducer;
