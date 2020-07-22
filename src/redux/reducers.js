const initialState = {
  loading: false,
  posts: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_FETCH_PENDING":
      return { ...state, loading: true, posts: null };
    case "LOGIN_FETCH_SUCCESS":
      return { ...state, loading: false, posts: action.posts };
    default:
      return { ...state };
  }
};

export default loginReducer;
