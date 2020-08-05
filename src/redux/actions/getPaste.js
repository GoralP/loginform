import axios from "axios";
import { toast } from "react-toastify";

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
        console.log(res);
      })

      .catch((error) => {
        dispatch({ type: "GET_PASTE_FAILURE", message: error.message });
        toast.error("Paste not created", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
