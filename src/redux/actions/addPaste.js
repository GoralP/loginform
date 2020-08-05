import axios from "axios";
import { toast } from "react-toastify";

export const addPaste = (content, expiration, exposure, title) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "ADD_PASTE_PENDING" });

    axios
      .post(
        "https://pastebindemo.herokuapp.com/pastes",
        {
          content: content,
          Expiration: expiration,
          Exposure: exposure,
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "ADD_PASTE_SUCCESS",
        });
        // console.log(res);
        toast.success("New paste added successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
      })
      .catch((error) => {
        dispatch({ type: "ADD_PASTE_FAILURE", message: error.message });
        toast.error("New paste not added", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
