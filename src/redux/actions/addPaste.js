import axios from "axios";
import { toast } from "react-toastify";
import { getPaste } from "./getPaste";

export const addPaste = (content, expiration, exposure, title, setModal) => {
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
        dispatch(getPaste());
        toast.success("New paste added successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "ADD_PASTE_FAILURE", message: error.message });
        setModal(true);
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
