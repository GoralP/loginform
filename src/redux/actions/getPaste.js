import axios from "axios";

export const getPaste = () => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "GET_PASTE_PENDING" });

    axios
      .get("https://pastebindemo.herokuapp.com/pastes", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "GET_PASTE_SUCCESS", allpaste: res.data });
      })

      .catch((error) => {
        dispatch({ type: "GET_PASTE_FAILURE", message: error.message });
      });
  };
};

export const fetchSinglePaste = (id) => {
  const getToken = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "SINGLE_PASTE_PENDING" });

    axios
      .get(`https://pastebindemo.herokuapp.com/pastes/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "SINGLE_PASTE_SUCCESS", paste: res.data });
      });
  };
};
