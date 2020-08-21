import axios from "axios";
import { toast } from "react-toastify";
import { getPaste } from "./getPaste";

export const deletePaste = (id) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "DELETE_PASTE_PENDING" });

    axios
      .delete(`https://pastebindemo.herokuapp.com/pastes/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_PASTE_SUCCESS" });
        dispatch(getPaste());
        toast.success("Deleted successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
      })

      .catch((error) => {
        dispatch({ type: "DELETE_PASTE_FAILURE", message: error.message });
      });
  };
};
