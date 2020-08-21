import axios from "axios";
import { toast } from "react-toastify";
import { getPaste } from "./getPaste";

export const editPaste = (
  content,
  expiration,
  exposure,
  title,
  id,
  setUpdateModal
) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "EDIT_PASTE_PENDING" });
    axios
      .put(
        `https://pastebindemo.herokuapp.com/pastes/${id}`,
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
          type: "EDIT_PASTE_SUCCESS",
        });
        dispatch(getPaste());
        toast.success("Edit paste successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
        setUpdateModal(false);
      })
      .catch((error) => {
        dispatch({ type: "EDIT_PASTE_FAILURE", message: error.message });
        setUpdateModal(true);
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
